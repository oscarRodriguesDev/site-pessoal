import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baseUrl = "https://portfolio.hiskra.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Oscar Rodrigues | Desenvolvedor FullStack",
    template: "%s | Oscar Rodrigues",
  },
  description:
    "Portfólio de Oscar Rodrigues, desenvolvedor FullStack com mais de 12 anos de experiência. Especialista em React, Next.js, Python e Inteligência Artificial. Soluções digitais sob medida.",
  keywords: [
    "Oscar Rodrigues",
    "desenvolvedor fullstack",
    "React",
    "Next.js",
    "Python",
    "inteligência artificial",
    "desenvolvimento web",
    "portfólio",
    "freelancer",
    "remoto",
    "Brasil",
    "Hiskra",
  ],
  authors: [{ name: "Oscar Rodrigues" }],
  creator: "Oscar Rodrigues",
  publisher: "Oscar Rodrigues",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    siteName: "Oscar Rodrigues",
    title: "Oscar Rodrigues | Desenvolvedor FullStack",
    description:
      "Portfólio de Oscar Rodrigues, desenvolvedor FullStack com mais de 12 anos de experiência. Especialista em React, Next.js, Python e Inteligência Artificial.",
    images: [
      {
        url: "https://cdn.cosmicjs.com/profilepictures.jpg",
        width: 1920,
        height: 1080,
        alt: "Oscar Rodrigues - Desenvolvedor FullStack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar Rodrigues | Desenvolvedor FullStack",
    description:
      "Portfólio de Oscar Rodrigues, desenvolvedor FullStack com mais de 12 anos de experiência.",
    images: ["https://cdn.cosmicjs.com/profilepictures.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    name: "Oscar Rodrigues",
    url: baseUrl,
    image: "https://cdn.cosmicjs.com/profilepictures.jpg",
    description:
      "Desenvolvedor FullStack com mais de 12 anos de experiência. Especialista em React, Next.js, Python e Inteligência Artificial.",
    jobTitle: "Desenvolvedor FullStack",
    email: "oscar.gst.projetos@gmail.com",
    telephone: "+55-27-98899-1663",
    worksFor: {
      "@type": "Organization",
      name: "Hiskra",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Serra",
      addressRegion: "ES",
      addressCountry: "BR",
    },
    sameAs: [
      "https://github.com/oscarRodriguesDev",
      "https://www.linkedin.com/in/oscar-r-neto/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Inteligência Artificial",
      "Desenvolvimento Web",
      "FullStack Development",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    name: "Oscar Rodrigues",
    url: baseUrl,
    description:
      "Portfólio de Oscar Rodrigues, desenvolvedor FullStack com mais de 12 anos de experiência.",
    publisher: { "@id": `${baseUrl}#person` },
    inLanguage: "pt-BR",
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}#portfolio`,
    name: "Portfólio de Oscar Rodrigues",
    url: baseUrl,
    description:
      "Coleção de projetos e trabalhos de Oscar Rodrigues, desenvolvedor FullStack.",
    author: { "@id": `${baseUrl}#person` },
    inLanguage: "pt-BR",
  };

  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
              portfolioSchema,
            ]),
          }}
        />
        <Analytics />
      </head>
      <body
        className={`${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
