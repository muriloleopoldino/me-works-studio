# 🔐 Guia do Ícone Administrativo - EMT Tech

## 📋 Visão Geral

O painel administrativo agora é acessível através de um **ícone flutuante discreto** fixo no site. O ícone é visível para todos, mas apenas administradores autenticados conseguem acessar o painel.

---

## 🎨 Ícone Flutuante

### **Localização**
- Posição fixa no **canto inferior direito** do site
- Sempre visível enquanto o usuário navega
- Não interfere com o conteúdo da página

### **Aparência**

#### **Para Visitantes (Não Autenticados)**
- Ícone: 🔐 Cadeado (Lock)
- Cor: Primária (tons azuis)
- Tooltip: "Login Admin"
- Função: Leva para página de login

#### **Para Administradores (Autenticados)**
- Ícone: 🛡️ Escudo (Shield)
- Cor: Primária com efeito de pulso
- Tooltip: "Painel Admin"
- Função: Acesso direto ao painel
- **Efeito especial**: Animação de pulso suave (indica que está logado)

### **Comportamento do Ícone**

**Hover (mouse sobre o ícone):**
- Sobe levemente (animação vertical)
- Brilho ao redor aumenta
- Tooltip aparece com a ação
- Efeito visual de "ativação"

**Clique:**
- **Se não autenticado**: Redireciona para `/admin/login`
- **Se autenticado**: Redireciona para `/admin/dashboard`

---

## 🔐 Sistema de Acesso

### **Fluxo para Visitantes**

1. Visitante vê o ícone no canto inferior direito
2. Clica no ícone
3. Sistema verifica se está autenticado
4. ❌ Como não está, redireciona para página de login
5. Visitante é bloqueado (não consegue acessar o painel)
6. Ícone mostra cadeado (Lock)

### **Fluxo para Administrador**

1. Administrador faz login em `/admin/login`
2. Volta para página inicial
3. Vê o ícone com escudo e efeito de pulso
4. Clica no ícone
5. ✅ Como está autenticado, acessa `/admin/dashboard` diretamente
6. Painel completo com todos os leads

---

## 📊 O que Administrador Vê no Painel

### **Seção de Estatísticas**
- Total de Leads
- Novos (status: novo)
- Contatados (status: contatado)
- Qualificados (status: qualificado)

### **Tabela de Leads**
Cada lead mostra:
- 👤 Nome do cliente
- 📧 E-mail
- 📞 Telefone (se fornecido)
- 📅 Data de recebimento
- 🏷️ Status atual
- 📁 Tipo de projeto

### **Funcionalidades**
- **Buscar**: Campo para pesquisar leads por nome, e-mail ou tipo de projeto
- **Filtrar**: Dropdown para filtrar por status
- **Atualizar**: Botão para recarregar lista
- **Ver Detalhes**: Clique em qualquer lead para ver todos os detalhes
- **Mudar Status**: Modal permite atualizar status do lead (Novo → Contatado → Qualificado → Fechado)

### **Modal de Detalhes**
Ao clicar em um lead:
- Informações completas (nome, e-mail, telefone)
- Tipo de projeto
- Mensagem completa
- Botões para mudar status
- Links diretos para e-mail e WhatsApp

---

## 🔒 Segurança Implementada

### ✅ Proteções Ativas

1. **Autenticação Obrigatória**
   - Sem login, não consegue acessar o painel
   - Redirecionamento automático para `/admin/login`

2. **Row Level Security (RLS) no Banco**
   - Públicos podem enviar formulário
   - Apenas autenticados conseguem visualizar os leads

3. **Protected Route**
   - Rota `/admin/dashboard` é protegida
   - Visitantes que tentam acessar via URL são redirecionados

4. **Ícone Inteligente**
   - Visitantes conseguem ver o ícone
   - Mas clicando, são levados ao login
   - Não conseguem acessar o painel diretamente

---

## 🛠️ Primeira Configuração (Admin)

### **Criar Conta de Administrador**

1. Acesse: https://supabase.com/dashboard
2. Vá em **Authentication** → **Users**
3. Clique **Add user** → **Create new user**
4. Preencha:
   - Email: `seu-email@exemplo.com`
   - Password: `sua-senha-segura`
   - Marque: **Auto Confirm User** ✅
5. Clique **Create user**

### **Primeiro Acesso**

1. Volte ao site (página inicial)
2. Clique no ícone no canto inferior direito
3. Será redirecionado para login (`/admin/login`)
4. Insira suas credenciais
5. Clique **Entrar no Painel**
6. Será redirecionado para o painel completo

---

## 📱 Comportamento em Diferentes Dispositivos

### **Desktop**
- Ícone fixo no canto inferior direito
- Tamanho: 64px x 64px
- Tooltip aparece ao lado (esquerda do ícone)
- Animações suaves

### **Tablet**
- Ícone visível e funcional
- Tamanho: 64px x 64px
- Bom espaço para não interferer com conteúdo

### **Mobile**
- Ícone visível e bem posicionado
- Tamanho adequado para tocar com dedo
- Tooltip aparece acima do ícone

---

## 🎯 Funcionalidades do Painel

### **Visualização de Leads**
- Lista com todos os leads recebidos
- Ordenado por data (mais recente primeiro)
- Filtros por status e busca por texto

### **Gerenciamento de Status**
- 4 Status disponíveis:
  - **Novo**: Lead acabou de chegar
  - **Contatado**: Você entrou em contato
  - **Qualificado**: Lead tem potencial
  - **Fechado**: Projeto concluído ou descartado

### **Ações Rápidas**
- Clicar em lead abre modal com detalhes
- Links de email direto para responder
- Links de WhatsApp para comunicação rápida
- Atualizar status com um clique

### **Logout**
- Botão "Sair" no canto superior direito
- Desconecta e volta para página inicial
- Ícone volta a mostrar "Login Admin"

---

## 🔄 Fluxo Completo de Uso

### **Cliente (Visitante)**
1. Acessa site
2. Vê ícone no canto inferior direito (cadeado)
3. Preenche formulário de contato
4. Clica "Enviar"
5. Dados salvos no banco automaticamente
6. Recebe confirmação

### **Administrador**
1. Acessa site
2. Clica no ícone (cadeado) → Login
3. Insere email e senha
4. Clica "Entrar no Painel"
5. Vê dashboard com estatísticas
6. Pode buscar, filtrar e clicar em leads
7. Vê detalhes e atualiza status
8. Responde por e-mail ou WhatsApp
9. Clica "Sair" para desconectar

---

## ⚙️ Variáveis de Ambiente

Certifique-se de que essas variáveis estão configuradas:

```env
VITE_SUPABASE_URL=seu_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

---

## 🆘 Troubleshooting

### "Ícone não aparece"
- Verifique se está na página inicial (`/`)
- Atualize a página (F5)
- Verifique console (F12) por erros

### "Não consigo fazer login"
- Verifique email e senha
- Confirme que usuário foi criado no Supabase
- Verifique se a conta está ativa (not suspended)

### "Painel carrega mas não mostra leads"
- Verifique se tabela `leads` existe no Supabase
- Confirme que há dados na tabela
- Verifique RLS policies

### "Ícone não muda de escudo/cadeado"
- Atualize a página após fazer login
- Verifique se sesão está ativa

---

## 📧 Suporte

Se precisar de ajuda:
1. Revise este guia
2. Verifique as variáveis de ambiente
3. Confirme credenciais no Supabase
4. Verifique console do navegador (F12) para erros

---

**EMT Tech** - Painel Administrativo com Acesso Seguro
Desenvolvido com precisão para sua empresa.
