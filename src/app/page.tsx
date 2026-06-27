import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Particles from "@/components/particles";

const socialLinks = [
  {
    icon: <FaGithub size={18} />,
    href: "https://github.com/oscarRodriguesDev",
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn size={18} />,
    href: "https://www.linkedin.com/in/oscar-rodrigues-dev/",
    label: "LinkedIn",
  },
  {
    icon: <HiOutlineMail size={18} />,
    href: "mailto:oscar@hiskra.com.br",
    label: "Email",
  },
  {
    icon: <FaWhatsapp size={18} />,
    href: "https://wa.me/5511999999999",
    label: "WhatsApp",
  },
];

const ctaLinks = [
  { name: "Ver Projetos", href: "/projects", primary: true },
  { name: "Sobre Mim", href: "/about", primary: false },
];

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-white dark:bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/40 via-white to-zinc-300/40 dark:from-zinc-800/20 dark:via-black dark:to-zinc-900/20" />
      <div className="absolute inset-0 bg-grid-white opacity-[0.04] dark:opacity-[0.02]" />

      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={120}
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="mb-6 animate-fade-down">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase border rounded-full text-zinc-500 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-900/50 backdrop-blur-sm">
            Desenvolvedor FullStack
          </span>
        </div>

        <div className="hidden w-screen h-px max-w-xs animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-400/0 via-zinc-400/50 to-zinc-400/0 dark:from-zinc-300/0 dark:via-zinc-300/50 dark:to-zinc-300/0" />

        <h1 className="z-10 mt-4 text-5xl font-bold text-transparent duration-1000 bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text cursor-default animate-title font-display sm:text-7xl md:text-8xl">
          OSCAR RODRIGUES
        </h1>

        <div className="hidden w-screen h-px max-w-xs animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-400/0 via-zinc-400/50 to-zinc-400/0 dark:from-zinc-300/0 dark:via-zinc-300/50 dark:to-zinc-300/0" />

        <p className="max-w-md mt-6 text-base leading-relaxed text-zinc-500 dark:text-zinc-400 animate-fade-up">
          Transformando ideias em soluções digitais há mais de 12 anos.
          Especialista em React, Next.js, Python e Inteligência Artificial.
        </p>

        <div className="flex items-center gap-4 mt-8 animate-fade-up">
          {ctaLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.primary
                  ? "px-6 py-3 text-sm font-medium text-white transition-all duration-300 bg-zinc-900 rounded-full hover:bg-zinc-700 hover:scale-105 dark:text-black dark:bg-white dark:hover:bg-zinc-200"
                  : "px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-all duration-300 border border-zinc-300 dark:border-zinc-700 rounded-full hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/50"
              }
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5 mt-12 animate-fade-in">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 text-zinc-400 dark:text-zinc-500 transition-all duration-300 border border-zinc-300 dark:border-zinc-800 rounded-full hover:text-zinc-700 dark:hover:text-zinc-100 hover:border-zinc-500 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:scale-110"
              aria-label={link.label}
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <div className="w-5 h-8 border-2 rounded-full border-zinc-300 dark:border-zinc-700">
          <div className="w-1 h-2 mx-auto mt-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
        </div>
      </div>
    </div>
  );
}