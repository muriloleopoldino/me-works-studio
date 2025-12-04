/*
  # Criar tabela de envios do formulário

  ## Descrição
  Esta migração cria a estrutura completa para armazenar todos os envios do formulário de contato da ME Works.
  
  ## 1. Nova Tabela: `form_submissions`
    - `id` (uuid, primary key) - Identificador único de cada envio
    - `name` (text, obrigatório) - Nome do cliente
    - `email` (text, obrigatório) - E-mail do cliente
    - `phone` (text, opcional) - Telefone do cliente
    - `project_type` (text, obrigatório) - Tipo de projeto solicitado
    - `message` (text, obrigatório) - Mensagem/observações do cliente
    - `created_at` (timestamptz) - Data e hora do envio (automático)
  
  ## 2. Segurança (RLS)
    - Habilita Row Level Security na tabela
    - **Política INSERT**: Qualquer pessoa pode enviar o formulário (público)
    - **Política SELECT**: Apenas usuários autenticados podem visualizar os dados (admin)
  
  ## 3. Notas Importantes
    - Os dados são salvos automaticamente quando o cliente envia o formulário
    - Apenas administradores autenticados podem acessar o painel e visualizar os envios
    - Cada envio é registrado com timestamp preciso para rastreamento
*/

-- Criar tabela de envios do formulário
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode INSERIR dados (enviar formulário)
CREATE POLICY "Qualquer pessoa pode enviar formulário"
  ON form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Política: Apenas usuários autenticados podem VISUALIZAR os dados
CREATE POLICY "Apenas admin autenticado pode visualizar envios"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Criar índice para melhorar performance nas consultas por data
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at 
  ON form_submissions(created_at DESC);