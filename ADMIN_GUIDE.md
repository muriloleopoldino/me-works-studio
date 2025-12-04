# 🔐 Guia do Sistema de Administração - ME Works

## 📋 Visão Geral

Este sistema automatiza completamente a captura e gerenciamento de solicitações de orçamento através do formulário de contato do site ME Works.

### ✨ Funcionalidades Implementadas

1. **Salvamento Automático de Dados**
   - Todos os envios do formulário são salvos automaticamente no banco de dados
   - Captura: Nome, E-mail, Telefone, Tipo de Projeto, Mensagem e Data/Hora

2. **Painel Administrativo Completo**
   - Visualização organizada de todos os envios
   - Estatísticas em tempo real (total de envios, envios de hoje)
   - Detalhes completos de cada solicitação
   - Botões de ação rápida (responder por e-mail, WhatsApp)

3. **Sistema de Autenticação Seguro**
   - Acesso protegido por login e senha
   - Apenas administradores autenticados podem ver os dados
   - Botão de acesso ao painel visível apenas quando logado

## 🚀 Como Usar

### Primeira Configuração (Apenas uma vez)

#### 1. Criar Conta de Administrador

Para criar sua conta de administrador, você precisa usar o Supabase Dashboard:

1. Acesse o painel do Supabase em: https://supabase.com/dashboard
2. Vá em **Authentication** > **Users**
3. Clique em **Add user** > **Create new user**
4. Preencha:
   - **Email**: seu-email@exemplo.com
   - **Password**: sua-senha-segura
   - Marque a opção **Auto Confirm User**
5. Clique em **Create user**

Pronto! Agora você pode fazer login no painel administrativo.

### Acessando o Painel Admin

#### Opção 1: Através do Botão no Header (quando logado)
1. Faça login no sistema
2. O botão **Admin** aparecerá automaticamente no menu superior
3. Clique no botão para acessar o painel

#### Opção 2: Através da URL Direta
1. Acesse: `https://seu-site.com/login`
2. Insira seu e-mail e senha cadastrados
3. Clique em **Entrar no Painel**
4. Você será redirecionado para o painel administrativo

### Visualizando os Envios

No painel administrativo você verá:

**📊 Estatísticas no topo:**
- Total de envios recebidos
- Envios recebidos hoje
- Seu e-mail de administrador

**📋 Tabela de envios com:**
- Nome e e-mail do cliente
- Telefone (se fornecido)
- Tipo de projeto solicitado
- Data e hora do envio
- Botão para ver mensagem completa

**💬 Detalhes da mensagem:**
- Clique em **Ver Mensagem** para abrir o modal com todos os detalhes
- Botões de ação rápida:
  - **Responder por E-mail**: Abre seu cliente de e-mail
  - **WhatsApp**: Abre conversa no WhatsApp (se o cliente forneceu telefone)

## 🔒 Segurança

### Proteções Implementadas

1. **Row Level Security (RLS)**
   - Qualquer pessoa pode enviar o formulário (público)
   - Apenas usuários autenticados podem visualizar os dados

2. **Autenticação Obrigatória**
   - Painel admin requer login
   - Redirecionamento automático se não estiver logado

3. **Botão Oculto**
   - O botão de acesso ao admin só aparece para usuários logados
   - Visitantes e clientes não veem o botão

## 📱 Fluxo Completo

### Cliente (Visitante do Site)
1. Preenche o formulário de contato
2. Clica em **Solicitar Orçamento**
3. Recebe confirmação de envio
4. Dados são salvos automaticamente no banco

### Administrador
1. Faz login em `/login`
2. Acessa o painel em `/admin`
3. Visualiza todos os envios organizados
4. Clica em **Ver Mensagem** para detalhes
5. Responde por e-mail ou WhatsApp

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui + Framer Motion
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Segurança**: Row Level Security (RLS)

## 📝 Estrutura do Banco de Dados

### Tabela: `form_submissions`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | Identificador único (automático) |
| name | text | Nome do cliente |
| email | text | E-mail do cliente |
| phone | text | Telefone (opcional) |
| project_type | text | Tipo de projeto |
| message | text | Mensagem do cliente |
| created_at | timestamp | Data/hora do envio (automático) |

## 🔄 Manutenção

### Como fazer logout
1. No painel administrativo, clique no botão **Sair** no canto superior direito
2. Você será deslogado e redirecionado para a página inicial

### Esqueci minha senha
1. Acesse o Supabase Dashboard
2. Vá em Authentication > Users
3. Encontre seu usuário e clique em **Reset Password**
4. Siga as instruções no e-mail recebido

## 📞 Suporte

Se precisar de ajuda ou tiver dúvidas:
- Revise este guia
- Verifique se as variáveis de ambiente estão configuradas
- Certifique-se de que o usuário admin foi criado no Supabase
- Confirme que você está usando as credenciais corretas

---

**ME Works** - Sistema de Automação de Formulários
Desenvolvido com dedicação por Murilo & Eduardo
