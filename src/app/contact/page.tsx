"use client";
import { useState } from "react";
import { Mail, Linkedin, MapPin, Send } from "lucide-react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { Navigation } from "@/components/nav";
import { Card } from "@/components/card";

const socials = [
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/oscar-r-neto/",
    label: "LinkedIn",
    handle: "Oscar Rodrigues",
  },
  {
    icon: <FaGithub size={20} />,
    href: "https://github.com/oscarRodriguesDev",
    label: "GitHub",
    handle: "OscarRodriguesDev",
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:oscar.gst.projetos@gmail.com",
    label: "E-mail",
    handle: "oscar@hiskra.com.br",
  },
  /*   {
      icon: <FaWhatsapp size={20} />,
      href: "https://wa.me/5527988991663",
      label: "WhatsApp",
      handle: "(27) 98899-1663",
    }, */
];

export default function Contato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim() || !form.mensagem.trim()) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <div className="relative pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-200/20 via-transparent to-transparent dark:from-zinc-900/20" />

        <div className="relative px-6 mx-auto max-w-7xl">
          {/* Header */}
          <div className="max-w-2xl mx-auto mb-12 text-center lg:mb-16 animate-fade-in">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase border rounded-full text-zinc-500 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-900/50">
              Contato
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
              Vamos trabalhar juntos
            </h1>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400">
              Mande uma mensagem ou me encontre nas redes sociais.
            </p>
          </div>

          <div className="grid max-w-5xl grid-cols-1 gap-10 mx-auto lg:grid-cols-5 animate-fade-up">
            {/* Form */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Send size={24} className="text-zinc-600 dark:text-zinc-300" />
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                    Mensagem enviada!
                  </h2>
                  <p className="mt-2 text-zinc-500">
                    Obrigado pelo contato. Responderei em breve.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ nome: "", email: "", telefone: "", mensagem: "" }); }}
                    className="mt-6 px-6 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  >
                    Enviar outra
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Nome <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Telefone <span className="text-zinc-400">(opcional)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.telefone}
                      onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Mensagem <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 resize-none"
                      placeholder="Sua mensagem..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium text-white transition-colors bg-zinc-800 rounded-xl hover:bg-zinc-700 dark:text-black dark:bg-zinc-100 dark:hover:bg-zinc-200"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>

            {/* Social Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {socials.map((s, i) => (
                <Card key={i}>
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/80 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 group-hover:border-zinc-400 dark:group-hover:border-zinc-500">
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 truncate">
                        {s.handle}
                      </p>
                      <p className="text-xs text-zinc-500">{s.label}</p>
                    </div>
                  </Link>
                </Card>
              ))}

              <div className="flex items-center justify-center gap-2 pt-4 text-sm text-zinc-400">
                <MapPin size={14} />
                <span>Brasil — Remoto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
