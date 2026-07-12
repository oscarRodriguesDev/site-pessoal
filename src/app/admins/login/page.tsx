"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LogIn, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Particles from "@/components/particles";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao fazer login");
        return;
      }

      router.push("/admins/dashboard");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Background com gradiente igual à home */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/40 via-white to-zinc-300/40 dark:from-zinc-800/20 dark:via-black dark:to-zinc-900/20" />
      <div className="absolute inset-0 bg-grid-white opacity-[0.04] dark:opacity-[0.02]" />

      {/* Particles */}
      <Particles className="absolute inset-0 -z-10" quantity={80} />

      {/* Botão voltar */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar ao site
      </Link>

      <div className="relative z-10 w-full max-w-sm px-6 animate-fade-in">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 dark:bg-white mb-6 shadow-lg shadow-zinc-900/10 dark:shadow-white/10">
            <Shield className="w-7 h-7 text-white dark:text-black" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Acesso Restrito
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Área administrativa do portfólio
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl p-8 shadow-xl shadow-zinc-200/20 dark:shadow-black/20"
        >
          {error && (
            <div className="animate-fade-up rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200/60 dark:border-red-800/60 px-4 py-3 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="user"
              className="block text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Usuário
            </label>
            <input
              id="user"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/50 dark:focus:ring-zinc-600/50 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
              placeholder="Digite seu usuário"
              required
              autoFocus
              autoComplete="username"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/50 dark:focus:ring-zinc-600/50 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
              placeholder="Digite sua senha"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full rounded-xl bg-zinc-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <span
              className={`inline-flex items-center gap-2 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
            >
              <LogIn size={16} />
              Entrar
            </span>
            {loading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
            )}
          </button>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
              Apenas pessoal autorizado
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
