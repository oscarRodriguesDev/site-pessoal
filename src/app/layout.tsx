import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "Oscar Rodrigues",
    template: "%s | Oscar Rodrigues",
  },
  description: "Desenvolvedor FullStack - Portfólio de projetos e serviços",
  openGraph: {
    title: "Oscar Rodrigues",
    description: "Desenvolvedor FullStack - Portfólio de projetos e serviços",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    siteName: "Oscar Rodrigues",
    images: [
      {
        url: "https://cdn.cosmicjs.com/profilepictures.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "pt-BR",
    type: "website",
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
  twitter: {
    title: "Oscar Rodrigues",
    card: "summary_large_image",
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
  return (
    <html lang="pt-br" className={inter.variable}>
      <head>
        <Analytics />
      </head>
      <body
        className={`${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}