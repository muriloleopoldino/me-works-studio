-- ==============================================================================
-- FIX LEADS TABLE & NOTIFICATIONS (DEFINITIVE)
-- ==============================================================================

-- 1. DROP EVERYTHING RELATED TO THE OLD TRIGGER
-- We do this to ensure a clean slate. No ghost triggers allowed.
DROP TRIGGER IF EXISTS on_lead_created ON leads;
DROP FUNCTION IF EXISTS notify_new_lead();

-- 2. ENSURE EXTENSIONS EXIST
-- pg_net is required for asynchronous HTTP requests (non-blocking)
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- 3. FIX RLS POLICIES (SECURITY & PERMISSIONS)
-- Ensure the table is secure but accessible for the form
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop old policies to avoid conflicts
DROP POLICY IF EXISTS "Qualquer pessoa pode criar lead" ON leads;
DROP POLICY IF EXISTS "Apenas autenticados podem visualizar leads" ON leads;
DROP POLICY IF EXISTS "Apenas autenticados podem atualizar lead" ON leads;
DROP POLICY IF EXISTS "Apenas autenticados podem deletar lead" ON leads;
DROP POLICY IF EXISTS "Enable insert for anon and authenticated users" ON leads;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON leads;

-- Create definitive policies
-- ALLOW INSERT for everyone (anon + authenticated) -> Essential for the public form
CREATE POLICY "public_insert_leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ALLOW SELECT/UPDATE/DELETE only for authenticated (Admin)
CREATE POLICY "admin_all_leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. CREATE ROBUST ASYNCHRONOUS NOTIFICATION FUNCTION
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
DECLARE
  -- Hardcoded URL to ensure it works in production
  -- We use the project URL found in .env
  function_url text := 'https://svloritiknjdfbradagr.supabase.co/functions/v1/notify-new-lead';
  service_role_key text;
BEGIN
  -- Attempt to get the service role key safely
  BEGIN
    service_role_key := current_setting('app.settings.service_role_key', true);
    IF service_role_key IS NULL THEN
       service_role_key := current_setting('app.supabase_service_role_key', true);
    END IF;
  EXCEPTION WHEN OTHERS THEN
    service_role_key := NULL;
  END;

  -- If key is missing, we LOG a warning but DO NOT FAIL.
  -- The lead MUST be saved regardless of email configuration.
  IF service_role_key IS NULL THEN
    RAISE WARNING 'notify_new_lead: Service role key not found. Notification skipped.';
    RETURN NEW;
  END IF;

  -- EXECUTE ASYNC REQUEST via pg_net
  -- This puts the request in a queue. It returns immediately.
  -- It does NOT wait for the Edge Function to finish.
  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object(
      'record', jsonb_build_object(
        'id', NEW.id,
        'name', NEW.name,
        'email', NEW.email,
        'phone', NEW.phone,
        'project_type', NEW.project_type,
        'message', NEW.message,
        'created_at', NEW.created_at
      )
    )
  );

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- CATCH-ALL SAFETY NET
    -- If anything goes wrong in this function, log it and RETURN NEW.
    -- This ensures the INSERT operation NEVER fails due to the trigger.
    RAISE WARNING 'notify_new_lead: Unexpected error: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RE-ATTACH THE TRIGGER
CREATE TRIGGER on_lead_created
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();

-- 6. VERIFY INDICES
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
