# 🚀 Painel Administrativo EMT Tech - Guia de Configuração

## 📋 O que foi criado?

Um sistema completo de gerenciamento de leads com:

1. **Banco de dados** para armazenar todos os leads do formulário
2. **Autenticação segura** para proteger o acesso ao painel
3. **Painel administrativo** para visualizar e gerenciar leads
4. **Notificação automática** por e-mail sempre que um novo lead chegar
5. **Integração** do formulário de contato com o banco de dados

---

## 🎯 Funcionalidades Implementadas

### 1. Formulário de Contato (Site Público)
- Formulário no site captura: nome, e-mail, telefone, tipo de projeto e mensagem
- Dados salvos automaticamente no banco de dados Supabase
- Notificação por e-mail enviada instantaneamente

### 2. Painel Administrativo (`/admin/dashboard`)
- **Dashboard com estatísticas**: Total de leads, novos, contatados e qualificados
- **Lista de leads**: Visualização completa e organizada de todos os contatos
- **Busca e filtros**: Pesquisa por nome/e-mail e filtro por status
- **Detalhes do lead**: Modal com todas as informações do contato
- **Gestão de status**: Atualização do status de cada lead (Novo → Contatado → Qualificado → Fechado)
- **Atualização em tempo real**: Botão de refresh para carregar novos leads

### 3. Sistema de Autenticação
- **Login seguro** em `/admin/login`
- **Proteção de rotas**: Apenas usuários autenticados acessam o painel
- **Logout** com um clique

### 4. Notificação por E-mail
- **E-mail automático** para `agenciaemt@gmail.com` sempre que um novo lead chegar
- **Design profissional** do e-mail com todas as informações do lead
- **Link direto** para o painel admin no e-mail

---

## ⚙️ Configuração Inicial

### Passo 1: Criar o Primeiro Usuário Admin

Para acessar o painel administrativo, você precisa criar um usuário. Execute este comando SQL no Supabase:

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Execute este código (substitua o e-mail e senha):

```sql
-- Criar usuário admin
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@emttech.com.br',  -- MUDE AQUI: seu e-mail
  crypt('senha123', gen_salt('bf')),  -- MUDE AQUI: sua senha
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  ''
);
```

**IMPORTANTE**: Troque `admin@emttech.com.br` e `senha123` pelos seus dados reais!

### Passo 2: Configurar Notificações por E-mail (Opcional mas Recomendado)

Para ativar as notificações por e-mail, você precisa configurar uma conta no [Resend](https://resend.com):

1. Crie uma conta gratuita em [resend.com](https://resend.com/signup)
2. Verifique seu domínio ou use o domínio de teste
3. Obtenha sua **API Key**
4. No Supabase Dashboard:
   - Vá em **Project Settings → Edge Functions**
   - Clique em **Add new secret**
   - Nome: `RESEND_API_KEY`
   - Valor: Cole sua API key do Resend

**Domínio do E-mail**: No arquivo da Edge Function (`notify-new-lead`), o e-mail remetente está configurado como `noreply@emttech.com.br`. Você pode mudar isso para seu domínio verificado no Resend.

---

## 🔐 Como Acessar o Painel

1. **Acesse**: `https://seu-site.com/admin/login`
2. **Entre** com o e-mail e senha que você criou
3. **Pronto!** Você estará no dashboard

---

## 📊 Como Funciona o Fluxo

### Fluxo do Lead:
1. Visitante preenche o formulário no site
2. Dados salvos automaticamente no banco Supabase
3. Trigger do banco dispara a Edge Function
4. E-mail de notificação enviado para `agenciaemt@gmail.com`
5. Lead aparece no painel admin com status "Novo"
6. Equipe atualiza o status conforme o processo comercial

### Status dos Leads:
- 🌟 **Novo**: Lead acabou de chegar
- 📞 **Contatado**: Já fizemos o primeiro contato
- 🎯 **Qualificado**: Lead tem potencial de fechar
- ✅ **Fechado**: Projeto finalizado ou perdido

---

## 🔧 Estrutura Técnica

### Banco de Dados (Supabase)
- **Tabela**: `leads`
- **RLS ativado**: Apenas usuários autenticados podem ver leads
- **Trigger**: Dispara notificação automática por e-mail

### Edge Function
- **Nome**: `notify-new-lead`
- **Gatilho**: Automático quando novo lead é inserido
- **Serviço**: Resend para envio de e-mails
- **Destinatário**: agenciaemt@gmail.com

### Páginas Criadas
- `/admin/login` - Página de login
- `/admin/dashboard` - Painel principal
- `/` - Site público com formulário integrado

---

## 🛠️ Troubleshooting

### E-mails não estão sendo enviados?
1. Verifique se a variável `RESEND_API_KEY` está configurada no Supabase
2. Confirme que seu domínio está verificado no Resend
3. Cheque os logs da Edge Function no Supabase Dashboard

### Não consigo fazer login?
1. Confirme que você executou o SQL para criar o usuário
2. Verifique se o e-mail e senha estão corretos
3. Tente redefinir a senha no banco de dados

### Leads não aparecem no painel?
1. Verifique se o formulário está salvando no banco (cheque a tabela `leads` no Supabase)
2. Clique no botão de refresh no dashboard
3. Limpe o cache do navegador

---

## 📈 Próximos Passos Recomendados

1. ✅ Criar seu usuário admin
2. ✅ Configurar notificações por e-mail (Resend)
3. ✅ Testar o formulário de contato
4. ✅ Personalizar o e-mail de notificação se necessário
5. 📊 Criar mais usuários admin para a equipe (repetir o SQL)

---

## 🎉 Pronto!

Seu painel administrativo está completo e funcionando. Agora você pode:

- 📊 Visualizar todos os leads em tempo real
- 📧 Receber notificações por e-mail instantâneas
- 🔄 Gerenciar o status de cada lead
- 🔍 Buscar e filtrar contatos
- 📱 Acessar de qualquer dispositivo

**Acesse agora**: `/admin/login` e comece a gerenciar seus leads!
