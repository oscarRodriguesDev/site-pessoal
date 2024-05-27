import "./globals.css";

import { Metadata } from "next";
import { Analytics } from "@/components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Oscar Rodrigues",
    template: "",
  },
  description: "Portifólio dos serviços desenvolvidos por mim",
  openGraph: {
    title: "Oscar Rodrigues",
    description:
      "Co-founder of unkey.dev and founder of planetfall.io",
    url: "https://chronark.com",
    siteName: "Oscar.hiskra.com.br",
    images: [
      {
        url: "https://chronark.com/og.png",
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
    title: "Chronark",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}