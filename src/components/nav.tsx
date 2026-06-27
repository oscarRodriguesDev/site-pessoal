"use client";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const navLinks = [
  { name: "Projetos", href: "/projects" },
  { name: "Sobre", href: "/about" },
  { name: "Contato", href: "/contact" },
];

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const pathname = usePathname();

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
            : "bg-zinc-950/80 border-zinc-800/50"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <Link
            href="/"
            className="flex items-center gap-2 duration-200 text-zinc-400 hover:text-zinc-100"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Início</span>
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium duration-200 rounded-full ${
                    isActive
                      ? "text-zinc-100 bg-zinc-800/60"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
