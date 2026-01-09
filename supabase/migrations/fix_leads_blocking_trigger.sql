-- 1. Drop the blocking trigger immediately
DROP TRIGGER IF EXISTS on_lead_created ON leads;

-- 2. Drop the function associated with the trigger
DROP FUNCTION IF EXISTS notify_new_lead();

-- 3. Ensure RLS is enabled
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 4. Re-verify/Re-create policies to ensure public INSERT and admin SELECT
-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Qualquer pessoa pode criar lead" ON leads;
DROP POLICY IF EXISTS "Apenas autenticados podem visualizar leads" ON leads;
DROP POLICY IF EXISTS "Apenas autenticados podem atualizar lead" ON leads;
DROP POLICY IF EXISTS "Apenas autenticados podem deletar lead" ON leads;

-- Re-create policies
-- Policy 1: Public INSERT (for form)
CREATE POLICY "Qualquer pessoa pode criar lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy 2: Admin SELECT
CREATE POLICY "Apenas autenticados podem visualizar leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Admin UPDATE
CREATE POLICY "Apenas autenticados podem atualizar lead"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Admin DELETE
CREATE POLICY "Apenas autenticados podem deletar lead"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- 5. Verify indices (optional but good practice)
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
