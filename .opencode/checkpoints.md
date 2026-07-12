# Checkpoints do Projeto

## Última Sessão

### 2026-07-11 - Correções Login + Upload de Imagens

**Estado Final:**
- Branch: main
- Commits: 1c9ba2f
- Build: ✅ Sucesso

**O que foi corrigido/melhorado:**
- **Cookie path** alterado de `/admins` para `/` — resolve o problema de login
- **Logout** corrigido com path compatível
- **Middleware simplificado** — verifica apenas presença do cookie (validação JFT real nas APIs)
- **Upload de imagens** — nova API `/api/admins/upload` integrada ao Cosmic JS Media
- **Dashboard** — upload direto de screenshots e imagem de destaque com preview

---

### 2026-07-11 - Área Admin Secreta

**Estado Final:**
- Branch: main
- Commits: 8aa7c55
- Build: ✅ Sucesso

**O que foi criado:**
- `/admins/login` — Página de login com formulário estilizado
- `/admins/dashboard` — Dashboard protegido com formulário de post de projetos
- `/api/admins/login` — API de autenticação via JWT
- `/api/admins/projects` — API CRUD de projetos (Cosmic JS)
- `/api/admins/check` — API de verificação de sessão
- `src/middleware.ts` — Middleware de proteção de rotas
- `src/lib/auth.ts` — Auth helpers (Node.js)
- `src/lib/auth-edge.ts` — Auth helpers (Edge Runtime)
- `.env` — Novas variáveis: ADMIN_USER, ADMIN_PASSWORD, JWT_SECRET

**Credenciais de acesso:**
- Usuário: oscar.rodrigues
- Senha: definida em ADMIN_PASSWORD no .env

**Fluxo:**
1. Acessar `/admins/login`
2. Logar com as credenciais
3. Dashboard em `/admins/dashboard` com formulário para criar projetos
4. Projetos são postados no Cosmic JS via API

---

## Histórico de Checkpoints

### 2026-07-11 - Área Admin Secreta

**Data:** 2026-07-11
**Branch:** main
**Commits:** 8aa7c55
**Descrição:** Criação de área administrativa secreta com login e dashboard para postar projetos no portfólio

### 2026-06-29 - Implementação de SEO/GEO

**Data:** 2026-06-29
**Branch:** vibecode
**Commits:** 1270e76, d33d90a
**Descrição:** Implementação de SEO/GEO completo para portfolio.hiskra.com.br

### 2026-06-29 - Criação de README Profissional

**Data:** 2026-06-29
**Branch:** vibecode
**Commits:** 8f78e22, cbbc26a
**Descrição:** Criação de README profissional completo e arquivos de controle do projeto
