/*
  # Create trigger for lead notifications

  1. Changes
    - Create a database trigger that fires when a new lead is inserted
    - Trigger calls the Edge Function to send email notification
    - Uses Supabase's pg_net extension for HTTP requests

  2. Notes
    - The trigger fires AFTER INSERT on leads table
    - Calls the notify-new-lead Edge Function asynchronously
    - Doesn't block the insert operation if email fails
*/

-- Create function to notify about new leads
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
DECLARE
  function_url text;
  service_role_key text;
BEGIN
  -- Get the Supabase URL and service role key from environment
  function_url := current_setting('app.supabase_url', true) || '/functions/v1/notify-new-lead';
  service_role_key := current_setting('app.supabase_service_role_key', true);
  
  -- If settings are not available, use defaults (will be set by Supabase)
  IF function_url IS NULL OR function_url = '/functions/v1/notify-new-lead' THEN
    function_url := 'http://localhost:54321/functions/v1/notify-new-lead';
  END IF;

  -- Make async HTTP request to Edge Function
  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || COALESCE(service_role_key, '')
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
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to send notification: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_lead_created ON leads;
CREATE TRIGGER on_lead_created
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();