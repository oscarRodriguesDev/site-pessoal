import "./globals.css";

import { Metadata } from "next";
import { Analytics } from "@/components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Oscar Rodrigues",
    template: "chronark",
  },
  description: "Portifólio dos serviços desenvolvidos por mim",
  openGraph: {
    title: "Oscar Rodrigues",
    description:
      "Meu portfolio de produtos e serviços",
    url: "../../../public/profilepictures.jpg",
    siteName: "Oscar",
    images: [
      {
        url: "../../../public/profilepictures.jpg",
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
    title: "oscar Rodrigues",
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