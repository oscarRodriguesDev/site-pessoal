"use client";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { Navigation } from "@/components/nav";
import { Card } from "@/components/card";

const socials = [
  {
    icon: <Linkedin size={22} />,
    href: "https://www.linkedin.com/in/oscar-rodrigues-dev/",
    label: "LinkedIn",
    handle: "Oscar Rodrigues",
    description: "Conecte-se comigo no LinkedIn",
  },
  {
    icon: <FaGithub size={22} />,
    href: "https://github.com/oscarRodriguesDev",
    label: "GitHub",
    handle: "OscarRodriguesDev",
    description: "Confira meus repositórios",
  },
  {
    icon: <Mail size={22} />,
    href: "mailto:oscar@hiskra.com.br",
    label: "E-mail",
    handle: "oscar@hiskra.com.br",
    description: "Envie uma mensagem",
  },
  {
    icon: <FaWhatsapp size={22} />,
    href: "https://wa.me/5511999999999",
    label: "WhatsApp",
    handle: "(11) 99999-9999",
    description: "Vamos conversar",
  },
];

export default function Contato() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-transparent to-transparent" />

        <div className="relative px-6 mx-auto max-w-7xl">
          {/* Header */}
          <div className="max-w-2xl mx-auto mb-12 text-center lg:mb-16 animate-fade-in">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase border rounded-full text-zinc-400 border-zinc-700/50 bg-zinc-900/50">
              Contato
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Vamos trabalhar juntos
            </h1>
            <p className="mt-4 text-zinc-400">
              Estou disponível para novos projetos, parcerias e oportunidades.
              Escolha o canal de sua preferência.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 animate-fade-up">
            {socials.map((s, index) => (
              <Card key={index}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-6 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-14 h-14 text-zinc-300 transition-all duration-300 border rounded-2xl border-zinc-700/60 bg-zinc-900/80 group-hover:border-zinc-500 group-hover:text-white group-hover:bg-zinc-800/80 group-hover:scale-105">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white">
                      {s.handle}
                    </h3>
                    <p className="mt-0.5 text-sm text-zinc-500">
                      {s.label}
                    </p>
                    <p className="text-xs text-zinc-600">
                      {s.description}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 mt-16 text-sm text-zinc-600">
            <MapPin size={14} />
            <span>Brasil — Disponível para trabalho remoto</span>
          </div>
        </div>
      </div>
    </div>
  );
}