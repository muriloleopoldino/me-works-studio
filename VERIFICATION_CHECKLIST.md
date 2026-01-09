# ✅ Checklist de Verificação - Sistema de Leads Funcionando

## 🎯 Objetivo
Validar que o sistema de captação de leads está 100% funcional após a correção do banco de dados.

---

## 🔧 PRÉ-REQUISITOS

- [ ] Variáveis de ambiente configuradas (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY)
- [ ] Usuário admin criado no Supabase (Authentication → Users)
- [ ] Projeto rodando no Bolt ou hospedado

---

## 🧪 TESTES DE FUNCIONALIDADE

### 1️⃣ Testar Formulário de Contato

**Passo a passo:**
```
1. Acesse a página inicial (/)
2. Scroll até "Contato" ou "Solicitar Orçamento"
3. Preencha todos os campos:
   - Nome: Digite um nome qualquer
   - E-mail: Use um e-mail válido
   - Telefone: (opcional) Digite um telefone
   - Tipo de Projeto: Selecione uma opção
   - Mensagem: Escreva uma mensagem de teste
4. Clique em "Solicitar Orçamento"
```

**Resultados esperados:**
- [ ] Toast verde aparece: "Mensagem enviada com sucesso!"
- [ ] Formulário é limpo automaticamente
- [ ] Nenhuma mensagem de erro
- [ ] Console (F12) não mostra erros

**Se houver erro:**
```
Verifique:
- Campos obrigatórios foram preenchidos?
- Tipo de Projeto foi selecionado?
- Variáveis de ambiente estão corretas?
- Supabase RLS policy de INSERT está ativa?
```

---

### 2️⃣ Verificar Banco de Dados

**No Supabase Dashboard:**

```
1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em: SQL Editor
4. Execute:
   SELECT COUNT(*) FROM leads;
```

**Resultado esperado:**
```
count = 1 (ou mais, se enviou múltiplos testes)
```

**Se retornar 0:**
- Verificar se formulário foi realmente enviado (checar toast)
- Verificar console do navegador para erros
- Verificar tabela leads existe (deve estar em Schema: public)

---

### 3️⃣ Acessar Painel Admin

**Passo a passo:**

```
1. Acesse /admin/login
2. Digite suas credenciais:
   - E-mail: seu-email@supabase.com
   - Senha: sua-senha
3. Clique em "Entrar no Painel"
```

**Resultados esperados:**
- [ ] Login aceita credenciais
- [ ] Redirecionado para /admin/dashboard
- [ ] Painel carrega sem erros
- [ ] Nenhuma mensagem "Configuração Necessária"

**Se houver erro de login:**
```
Verifique:
- Usuário foi criado em Supabase (Authentication → Users)?
- E-mail está correto?
- Senha está correta?
- Conta foi marcada como "Auto Confirm User"?
```

---

### 4️⃣ Visualizar Leads no Painel

**O que você deve ver:**

**Seção de Estatísticas (topo):**
```
Total de Leads:  [Número aumentado]
Novos:          [1] (seu lead de teste)
Contatados:     [0]
Qualificados:   [0]
```

**Tabela de Leads:**
```
Nome              | E-mail           | Telefone    | Tipo Projeto      | Data
João Silva       | joao@email.com   | 11999999999 | Site Institucional | 15/01/2024 10:30
```

**Resultados esperados:**
- [ ] Contadores mostram números corretos
- [ ] Seu lead de teste aparece na tabela
- [ ] Não há mensagem de erro
- [ ] Tabela não está vazia

**Se estiver vazio:**
```
Possíveis causas:
1. Formulário não foi realmente enviado
2. RLS policy está bloqueando SELECT
3. Usuário não está autenticado corretamente
```

---

### 5️⃣ Clicar em um Lead para Ver Detalhes

**Passo a passo:**
```
1. Na tabela, clique em um lead
2. Um modal deve abrir
```

**Modal deve mostrar:**
```
Nome do Cliente:    João Silva
E-mail:             joao@email.com
Telefone:           (11) 99999-9999
Tipo de Projeto:    Site Institucional
Mensagem:           [Sua mensagem de teste]
Status:             [Botões para alterar]
```

**Resultados esperados:**
- [ ] Modal abre sem erro
- [ ] Todos os dados aparecem corretamente
- [ ] 4 botões de status visíveis (Novo, Contatado, Qualificado, Fechado)

---

### 6️⃣ Atualizar Status do Lead

**Passo a passo:**
```
1. Modal ainda aberto com lead
2. Clique no botão "Contatado"
3. Aguarde resposta (deve aparecer toast)
```

**Resultados esperados:**
- [ ] Toast verde: "Status atualizado com sucesso!"
- [ ] Modal se fecha ou atualiza
- [ ] Na tabela, status muda para "Contatado"
- [ ] Contador de "Novos" decresce, "Contatados" aumenta

**Se houver erro:**
```
Verifique:
- RLS policy UPDATE está ativa?
- Está autenticado como admin?
- Console mostra qual erro específico?
```

---

### 7️⃣ Testar Buscas e Filtros

**Buscar por nome:**
```
1. Digite no campo "Buscar leads..."
2. Tabela filtra em tempo real
3. [ ] Funcionamento correto
```

**Filtrar por status:**
```
1. Clique no dropdown de status
2. Selecione "Contatados"
3. Tabela mostra apenas leads contatados
4. [ ] Funcionamento correto
```

**Recarregar dados:**
```
1. Clique no ícone de recarregar (refresh)
2. Dados recarregam da database
3. [ ] Sem demora excessiva
```

---

### 8️⃣ Testar Logout

**Passo a passo:**
```
1. No painel admin, clique em "Sair"
2. Toast aparece: "Logout realizado"
3. Redirecionado para página inicial
4. Botão de admin ícone desaparece
```

**Resultados esperados:**
- [ ] Logout funciona
- [ ] Sessão termina
- [ ] Volta à página inicial
- [ ] Ao acessar /admin/dashboard diretamente, redireciona para login

---

## 🚨 Tratamento de Casos Especiais

### Banco Vazio (Nenhum Lead)

```
Se não enviou nenhum formulário ainda:

✅ Esperado:
- Painel carrega sem erro
- Contadores mostram 0
- Tabela mostra: "Nenhum lead encontrado"
- Sem mensagens de erro
```

### Múltiplos Leads

```
Se enviou 5+ leads:

✅ Esperado:
- Todos aparecem na tabela
- Ordenados por data (mais recente primeiro)
- Busca/filtro funcionam corretamente
- Performance aceitável
```

### Formulário com Campos Inválidos

```
Teste 1: Enviar sem preencher obrigatórios
✅ Esperado: Navegador valida (não deixa enviar)

Teste 2: E-mail inválido
✅ Esperado: Navegador valida (campo de tipo email)

Teste 3: Telefone inválido
✅ Esperado: Aceita (é opcional, qualquer valor)
```

---

## 📊 Resumo de Validação

| Funcionalidade | Status | Observações |
|---|---|---|
| Formulário envia dados | [ ] | Deve ver toast de sucesso |
| Dados aparecem em Supabase | [ ] | COUNT(*) > 0 em tabela leads |
| Login funciona | [ ] | Credenciais corretas |
| Painel carrega | [ ] | Sem "Configuração Necessária" |
| Leads aparecem no painel | [ ] | Tabela mostra dados |
| Contadores estão corretos | [ ] | Total = número de leads |
| Detalhes do lead abrem | [ ] | Modal mostra informações |
| Status pode ser alterado | [ ] | UPDATE funciona |
| Buscas funcionam | [ ] | Filtra em tempo real |
| Filtros funcionam | [ ] | Por status específico |
| Logout funciona | [ ] | Sessão encerra |

---

## ✅ Conclusão

Quando TODOS os itens acima tiverem ✅, seu sistema está 100% funcional!

**Sistema pronto para produção quando:**
- ✅ Formulário captura leads
- ✅ Painel visualiza leads
- ✅ Admin consegue gerenciar (alterar status)
- ✅ Sem erros no console
- ✅ Banco de dados conectado
- ✅ RLS protegendo dados

---

## 🆘 Se algo não funcionar

1. **Procure por erros** no Console (F12 → Console)
2. **Verifique variáveis de ambiente** (.env arquivo)
3. **Confirme Supabase credentials** (URL e Anon Key)
4. **Verifique RLS policies** em Supabase Dashboard
5. **Confira se tabela `leads` existe** (SQL Editor)

Sucesso! 🚀

