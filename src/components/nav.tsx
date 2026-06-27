"use client";
import { Home, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { name: "Projetos", href: "/projects" },
  { name: "Sobre", href: "/about" },
  { name: "Contato", href: "/contact" },
];

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md duration-300 border-b ${
          isIntersecting
            ? "bg-transparent border-transparent"
            : "bg-white/80 dark:bg-zinc-950/80 border-zinc-200 dark:border-zinc-800/50"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <Link
            href="/"
            className="flex items-center gap-2 duration-200 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Início</span>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium duration-200 rounded-full ${
                      isActive
                        ? "text-zinc-800 dark:text-zinc-100 bg-zinc-200/80 dark:bg-zinc-800/60"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/30"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={toggle}
              className="p-2 duration-200 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/30"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
