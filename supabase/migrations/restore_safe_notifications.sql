-- Enable pg_net extension for async HTTP requests
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- Create or replace the notification function
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
DECLARE
  -- Hardcoded URL to ensure it works in production (derived from .env)
  function_url text := 'https://svloritiknjdfbradagr.supabase.co/functions/v1/notify-new-lead';
  service_role_key text;
  request_id int;
BEGIN
  -- Attempt to get the service role key
  BEGIN
    service_role_key := current_setting('app.settings.service_role_key', true);
    
    IF service_role_key IS NULL THEN
       service_role_key := current_setting('app.supabase_service_role_key', true);
    END IF;
  EXCEPTION WHEN OTHERS THEN
    service_role_key := NULL;
  END;

  -- Safety check: If we don't have a key, log warning and skip notification
  -- This ensures the INSERT still succeeds even if config is missing
  IF service_role_key IS NULL THEN
    RAISE WARNING 'notify_new_lead: Service role key not found. Notification skipped.';
    RETURN NEW;
  END IF;

  -- Make async HTTP request using pg_net
  -- This puts the request in a queue and does NOT block the transaction
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
    -- CRITICAL: Catch ALL errors to ensure the lead is always saved
    RAISE WARNING 'notify_new_lead: Unexpected error triggering notification: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create the trigger
DROP TRIGGER IF EXISTS on_lead_created ON leads;
CREATE TRIGGER on_lead_created
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();
