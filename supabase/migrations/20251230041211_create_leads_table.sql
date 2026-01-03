/*
  # Create leads table for EMT Tech contact form

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text) - Nome do lead
      - `email` (text) - E-mail do lead
      - `phone` (text) - Telefone do lead
      - `project_type` (text) - Tipo de projeto selecionado
      - `message` (text) - Mensagem sobre o projeto
      - `status` (text) - Status do lead (new, contacted, qualified, closed)
      - `created_at` (timestamptz) - Data/hora do envio
      - `updated_at` (timestamptz) - Última atualização
  
  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to view all leads
    - Add policy for authenticated users to update lead status
    - Add policy for anyone to insert (form submission)
    - No public read access (only authenticated admins)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  project_type text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert leads (form submission)
CREATE POLICY "Anyone can submit lead form"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can view all leads
CREATE POLICY "Authenticated users can view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update lead status
CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);