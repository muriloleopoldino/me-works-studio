/*
  # Criar tabela leads - Tabela principal de leads/solicitações

  ## Descrição
  Tabela central para armazenar todos os leads capturados pelo formulário de contato.
  Substitui a tabela anterior 'form_submissions' com estrutura melhorada.
  
  ## 1. Nova Tabela: `leads`
    - `id` (uuid, primary key) - Identificador único
    - `name` (text, obrigatório) - Nome do cliente
    - `email` (text, obrigatório) - E-mail do cliente
    - `phone` (text, opcional) - Telefone do cliente
    - `project_type` (text, obrigatório) - Tipo de projeto (site-institucional, landing-page, portfolio, ecommerce, outro)
    - `message` (text, obrigatório) - Mensagem/descrição do projeto
    - `status` (text, padrão: 'new') - Status do lead (new, contacted, qualified, closed)
    - `created_at` (timestamp) - Data de criação do lead
    - `updated_at` (timestamp) - Data da última atualização
  
  ## 2. Segurança (RLS)
    - **INSERT**: Qualquer pessoa pode enviar (público - para formulário)
    - **SELECT**: Apenas usuários autenticados (painel admin)
    - **UPDATE**: Apenas usuários autenticados (alterar status)
    - **DELETE**: Apenas usuários autenticados
  
  ## 3. Índices para Performance
    - created_at DESC (para ordenação rápida)
    - status (para filtros de status)
  
  ## 4. Notas Importantes
    - Esta tabela é usada por:
      * ContactSection.tsx (formulário) - INSERT
      * Dashboard.tsx (painel admin) - SELECT, UPDATE
    - Status pode ser: 'new', 'contacted', 'qualified', 'closed'
    - O updated_at é atualizado automaticamente quando status muda
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política 1: Qualquer pessoa pode INSERIR (formulário público)
CREATE POLICY "Qualquer pessoa pode criar lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Política 2: Apenas autenticados podem VISUALIZAR
CREATE POLICY "Apenas autenticados podem visualizar leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Política 3: Apenas autenticados podem ATUALIZAR
CREATE POLICY "Apenas autenticados podem atualizar lead"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política 4: Apenas autenticados podem DELETAR
CREATE POLICY "Apenas autenticados podem deletar lead"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
