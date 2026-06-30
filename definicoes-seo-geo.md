# Definições SEO e GEO — Template de Configuração

> Use este arquivo como referência每次 (toda vez) que for configurar SEO e GEO em um novo projeto Next.js.
> Substitua todos os placeholders `{{PLACEHOLDER}}` pelos valores reais.

---

## 📋 Dados da Empresa (Preencha primeiro)

| Campo | Valor |
|-------|-------|
| **Nome da Empresa** | `{{EMPRESA_NOME}}` |
| **Nome Curto** | `{{EMPRESA_NOME_CURTO}}` |
| **Descrição (160 chars)** | `{{EMPRESA_DESCRICAO}}` |
| **URL do Site** | `{{SITE_URL}}` |
| **Telefone** | `{{TELEFONE}}` |
| **Formato Internacional** | `{{TELEFONE_INT}}` (ex: +55-27-98899-1663) |
| **Email** | `{{EMAIL}}` |
| **Rua/Número** | `{{RUA}}` |
| **Bairro** | `{{BAIRRO}}` |
| **Cidade** | `{{CIDADE}}` |
| **Estado (UF)** | `{{ESTADO}}` |
| **CEP** | `{{CEP}}` |
| **País** | `BR` |
| **Redes Sociais** | `{{SOCIAL_LINKS}}` (array de URLs) |
| **Keywords (12)** | `{{KEYWORDS}}` |
| **Imagem OG** | `{{OG_IMAGE}}` (ex: /hero-background.jpg) |
| **Logo** | `{{LOGO_PATH}}` (ex: /logo-hiskra.png) |

---

## 1. layout.tsx

```tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const baseUrl = '{{SITE_URL}}'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '{{EMPRESA_NOME_CURTO}} | {{TAGLINE}}',
    template: '%s | {{EMPRESA_NOME}}',
  },
  description: '{{EMPRESA_DESCRICAO}}',
  keywords: {{KEYWORDS}},
  authors: [{ name: '{{EMPRESA_NOME}}' }],
  creator: '{{EMPRESA_NOME}}',
  publisher: '{{EMPRESA_NOME}}',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: '{{EMPRESA_NOME}}',
    title: '{{EMPRESA_NOME_CURTO}} | {{TAGLINE}}',
    description: '{{EMPRESA_DESCRICAO_OG}}',
    images: [
      {
        url: '{{OG_IMAGE}}',
        width: 1920,
        height: 1080,
        alt: '{{EMPRESA_NOME}}',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '{{EMPRESA_NOME_CURTO}} | {{TAGLINE}}',
    description: '{{EMPRESA_DESCRICAO_OG}}',
    images: ['{{OG_IMAGE}}'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: '{{EMPRESA_NOME}}',
    url: baseUrl,
    logo: `${baseUrl}{{LOGO_PATH}}`,
    description: '{{EMPRESA_DESCRICAO_SCHEMA}}',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '{{RUA}}',
      addressLocality: '{{CIDADE}}',
      addressRegion: '{{ESTADO}}',
      postalCode: '{{CEP}}',
      addressCountry: '{{PAIS}}',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '{{TELEFONE_INT}}',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
    sameAs: {{SOCIAL_LINKS}},
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    name: '{{EMPRESA_NOME}}',
    url: baseUrl,
    description: '{{EMPRESA_DESCRICAO_SCHEMA}}',
    publisher: { '@id': `${baseUrl}#organization` },
    inLanguage: 'pt-BR',
  }

  // Adicione os schemas de serviço conforme necessário
  const serviceSchemas = [
    // TEMPLATE: Copie e adapte para cada serviço
    // {
    //   '@context': 'https://schema.org',
    //   '@type': 'Service',
    //   serviceType: 'NOME_DO_SERVICO',
    //   provider: { '@id': `${baseUrl}#organization` },
    //   description: 'DESCRIÇÃO_DO_SERVICO',
    //   areaServing: 'BR',
    // },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      // TEMPLATE: Adapte as perguntas e respostas
      // {
      //   '@type': 'Question',
      //   name: 'PERGUNTA?',
      //   acceptedAnswer: {
      //     '@type': 'Answer',
      //     text: 'RESPOSTA.',
      //   },
      // },
    ],
  }

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
              ...serviceSchemas,
              faqSchema,
            ]),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 2. robots.txt → `public/robots.txt`

```
User-agent: *
Allow: /

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

# LLM files
Allow: /llms.txt
Allow: /llms-full.txt

Sitemap: {{SITE_URL}}/sitemap.xml
```

---

## 3. sitemap.ts → `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = '{{SITE_URL}}'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Adicione mais rotas conforme necessário
  ]
}
```

---

## 4. llms.txt → `public/llms.txt`

```markdown
# {{EMPRESA_NOME}}

> {{EMPRESA_DESCRICAO_LONGA}}

## Sobre

{{TEXTO_SOBRE}}

## Serviços

{{LISTA_SERVICOS}}

## Contato

- **WhatsApp:** {{TELEFONE}}
- **Email:** {{EMAIL}}
- **Site:** {{SITE_URL}}

## Localização

{{CIDADE}}, {{ESTADO}}, {{PAIS}}

## Tecnologias

{{TECNOLOGIAS}}
```

---

## 5. llms-full.txt → `public/llms-full.txt`

```markdown
# {{EMPRESA_NOME}} — Conteúdo Completo do Site

Este arquivo contém todo o texto exibido no site {{SITE_URL}}, formatado para ser facilmente interpretado por modelos de linguagem e sistemas de IA.

---

{{CONTEUDO_COMPLETO_DO_SITE}}
```

---

## 🔗 URLs de Validação (após deploy)

### Google
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Search Console:** https://search.google.com/search-console
- **PageSpeed Insights:** https://pagespeed.web.dev/

### Meta (Facebook/Instagram)
- **Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **Card Validator:** https://cards-dev.twitter.com/validator

### AI Crawlers
- **Bing Webmaster Tools:** https://www.bing.com/webmasters
- **Perplexity:** Verificar se `llms.txt` está acessível em `{{SITE_URL}}/llms.txt`
- **OpenAI:** Verificar se `GPTBot` pode acessar o site

### Schema.org
- **Schema Validator:** https://validator.schema.org/
- **Google Structured Data:** Usar o Rich Results Test acima

### Checklist de Validação
- [ ] `{{SITE_URL}}/robots.txt` acessível
- [ ] `{{SITE_URL}}/sitemap.xml` acessível
- [ ] `{{SITE_URL}}/llms.txt` acessível
- [ ] `{{SITE_URL}}/llms-full.txt` acessível
- [ ] Rich Results Test sem erros críticos
- [ ] OG Image aparece no Facebook Debugger
- [ ] Twitter Card aparece no Card Validator
- [ ] JSON-LD válido no Schema Validator

---

## 📝 Notas Importantes

1. **NUNCA** use `SoftwareApplication` sem `offers`/`aggregateRating`/`applicationCategory`/`operatingSystem` → use `Thing`
2. **SEMPRE** preencha `streetAddress`, `addressLocality`, `postalCode` no `PostalAddress`
3. **SEMPRE** use `metadataBase` para que URLs relativas funcionem no OG/Twitter
4. **SEMPRE** teste o Rich Results Test após deploy antes de considerar pronto
5. O arquivo `llms.txt` é o mais importante para GEO — mantenha atualizado
