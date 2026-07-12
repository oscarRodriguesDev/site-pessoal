# Registro de Pedidos

## Pedidos Registrados

### [PED-001] - Criar README Profissional

**Data:** 2026-06-29
**Status:** Concluído
**Commit:** 8f78e22
**Descrição:** Usuário solicitou criação de README profissional para o projeto de portfólio pessoal
**Resultado:** 
- README.md criado com documentação completa
- Badges de tecnologias
- Seção de features e tech stack
- Estrutura do projeto detalhada
- Instruções de instalação e configuração
- Variáveis de ambiente documentadas
- Instruções de deploy

### [PED-002] - Implementar SEO/GEO Completo

**Data:** 2026-06-29
**Status:** Concluído
**Commit:** 1270e76
**Descrição:** Usuário solicitou implementação de SEO/GEO para o site portfolio.hiskra.com.br
**Resultado:**
- layout.tsx: Metadados SEO completos com OpenGraph, Twitter Cards
- layout.tsx: Schema.org JSON-LD (Person, WebSite, CreativeWork)
- public/robots.txt: Regras para crawlers e AI bots
- src/app/sitemap.ts: Sitemap dinâmico com todas as páginas
- public/llms.txt: Resumo para AI crawlers (GEO)
- public/llms-full.txt: Conteúdo completo para AI crawlers
- Dados pessoais preenchidos corretamente

### [PED-003] - Criar Área Admin Secreta para Postar Portfólio

**Data:** 2026-07-11
**Status:** Concluído
**Commit:** (hash será definido)
**Descrição:** Usuário solicitou rota secreta `/admins/login` com autenticação para postar trabalhos do portfólio diretamente do site.
**Credenciais:** oscar.rodrigues / (definida na .env como ADMIN_PASSWORD)
**Resultado:**
- Sistema de autenticação via JWT com cookie httpOnly
- Página de login em `/admins/login` com design consistente
- Dashboard protegido em `/admins/dashboard` com formulário completo
- API de criação de projetos integrada ao Cosmic JS
- Middleware de proteção para rotas admin
- Campos: título, slug, descrições, tech stack, URLs, screenshots

---

## Formato de Registro

Cada pedido deve seguir este formato:

### [CÓDIGO-ÚNICO] - Descrição do Pedido

**Data:** YYYY-MM-DD
**Status:** Em andamento / Concluído
**Commit:** (hash do commit quando concluído)
**Descrição:** Detalhes do que foi solicitado
**Resultado:** O que foi implementado

---

## Histórico de Pedidos

(Adicionar pedidos conforme forem realizados)
