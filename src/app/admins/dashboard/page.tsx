"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  LogOut,
  Plus,
  X,
  ExternalLink,
  Github,
  Trash2,
  Upload,
  FolderEdit,
  ArrowLeft,
  Sparkles,
  Save,
  ImageIcon,
} from "lucide-react";
import Particles from "@/components/particles";

// ─── Types ───────────────────────────────────────────
interface Project {
  slug: string;
  title: string;
  metadata: {
    title: string;
    short_description: string;
    tech_stack: string[];
    live_url: string;
    github_url: string | null;
    featured_image?: { url: string } | null;
  };
}

// ─── Componente de Loading Spinner ───────────────────
function Spinner({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
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
  );
}

// ─── Componente de Input ─────────────────────────────
function Input({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 dark:focus:ring-zinc-600/40 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
      />
    </div>
  );
}

// ─── Componente de Textarea ──────────────────────────
function Textarea({
  label,
  ...props
}: {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 dark:focus:ring-zinc-600/40 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200 resize-y"
      />
    </div>
  );
}

// ─── Página Principal ────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [screenshotInput, setScreenshotInput] = useState("");
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);
  const featuredInputRef = useRef<HTMLInputElement>(null);
  const screenshotInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/admins/projects");
      if (res.status === 401) {
        router.push("/admins/login");
        return;
      }
      const data = await res.json();
      setProjects(data.objects ?? []);
    } catch {
      setFeedback({ type: "error", message: "Erro ao carregar projetos" });
    } finally {
      setLoadingProjects(false);
    }
  }

  async function handleLogout() {
    document.cookie = "admin_token=; path=/; max-age=0; SameSite=Lax";
    router.push("/admins/login");
  }

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  }

  function addTech() {
    const t = techInput.trim();
    if (t && !techStack.includes(t)) {
      setTechStack([...techStack, t]);
      setTechInput("");
    }
  }

  function removeTech(index: number) {
    setTechStack(techStack.filter((_, i) => i !== index));
  }

  function addScreenshot() {
    const s = screenshotInput.trim();
    if (s && !screenshots.includes(s)) {
      setScreenshots([...screenshots, s]);
      setScreenshotInput("");
    }
  }

  function removeScreenshot(index: number) {
    setScreenshots(screenshots.filter((_, i) => i !== index));
  }

  async function uploadFile(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admins/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setFeedback({ type: "error", message: data.error || "Erro no upload" });
        return null;
      }

      const data = await res.json();
      return data.url;
    } catch {
      setFeedback({ type: "error", message: "Erro de conexão no upload" });
      return null;
    }
  }

  async function handleFeaturedUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFeatured(true);
    const url = await uploadFile(file);
    if (url) setFeaturedImage(url);
    setUploadingFeatured(false);
    if (featuredInputRef.current) featuredInputRef.current.value = "";
  }

  async function handleScreenshotUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingScreenshot(true);
    const url = await uploadFile(file);
    if (url) setScreenshots([...screenshots, url]);
    setUploadingScreenshot(false);
    if (screenshotInputRef.current) screenshotInputRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admins/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          short_description: shortDesc,
          description,
          tech_stack: techStack,
          live_url: liveUrl,
          github_url: githubUrl || undefined,
          featured_image_url: featuredImage || undefined,
          screenshot_urls: screenshots.length > 0 ? screenshots : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback({
          type: "error",
          message: data.error || "Erro ao criar projeto",
        });
        return;
      }

      setFeedback({
        type: "success",
        message: `Projeto "${title}" publicado com sucesso!`,
      });

      // Reset form
      setTitle("");
      setSlug("");
      setShortDesc("");
      setDescription("");
      setTechStack([]);
      setLiveUrl("");
      setGithubUrl("");
      setFeaturedImage("");
      setScreenshots([]);
      setShowForm(false);

      fetchProjects();
    } catch {
      setFeedback({ type: "error", message: "Erro de conexão" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-200/30 via-white to-zinc-300/30 dark:from-zinc-800/10 dark:via-black dark:to-zinc-900/10 pointer-events-none" />
      <Particles
        className="fixed inset-0 -z-10 pointer-events-none"
        quantity={60}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft size={14} />
              Site
            </Link>
            <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800" />
            <div>
              <h1 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                Admin Panel
              </h1>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Gerencie seus projetos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-200 shadow-lg shadow-zinc-900/10 dark:shadow-white/5"
            >
              {showForm ? (
                <X size={16} />
              ) : (
                <Plus size={16} />
              )}
              {showForm ? "Fechar" : "Novo Projeto"}
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300/50 dark:border-zinc-700/50 px-4 py-2.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-all duration-200"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-6 py-8 mx-auto max-w-5xl">
        {/* Feedback */}
        {feedback && (
          <div
            className={`mb-8 animate-fade-up rounded-2xl border px-5 py-4 text-sm flex items-center justify-between shadow-lg ${
              feedback.type === "success"
                ? "bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 backdrop-blur-xl"
                : "bg-red-50/80 dark:bg-red-900/20 border-red-200/60 dark:border-red-800/60 text-red-600 dark:text-red-400 backdrop-blur-xl"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? (
                <Sparkles size={18} className="text-emerald-500" />
              ) : (
                <X size={18} className="text-red-500" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="ml-4 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Formulário */}
        {showForm && (
          <div className="mb-10 animate-fade-up">
            <div className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-zinc-200/10 dark:shadow-black/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white">
                  <FolderEdit className="w-5 h-5 text-white dark:text-black" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                    Novo Projeto
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Preencha os dados do projeto para publicar no portfólio
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título e Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Título *"
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Meu Projeto Incrível"
                    required
                  />
                  <Input
                    label="Slug *"
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="meu-projeto-incrivel"
                    required
                    className="font-mono"
                  />
                </div>

                {/* Descrições */}
                <Input
                  label="Descrição Curta"
                  type="text"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Uma breve descrição do projeto"
                />

                <Textarea
                  label="Descrição Completa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Descreva o projeto em detalhes..."
                />

                {/* URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="URL do Projeto (Live)"
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://meu-projeto.com"
                  />
                  <Input
                    label="URL do GitHub"
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/user/repo"
                  />
                </div>

                {/* Tech Stack */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Tecnologias
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTech())
                      }
                      className="flex-1 rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 dark:focus:ring-zinc-600/40 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
                      placeholder="React, Next.js, TypeScript..."
                    />
                    <button
                      type="button"
                      onClick={addTech}
                      className="rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300/60 dark:hover:bg-zinc-700/60 transition-all duration-200"
                    >
                      Adicionar
                    </button>
                  </div>
                  {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-300/50 dark:border-zinc-700/50"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTech(i)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Imagem de Destaque */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Imagem de Destaque
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      className="flex-1 rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 dark:focus:ring-zinc-600/40 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
                      placeholder="https://cdn.cosmicjs.com/imagem.jpg"
                    />
                    <input
                      ref={featuredInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleFeaturedUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => featuredInputRef.current?.click()}
                      disabled={uploadingFeatured}
                      className="inline-flex items-center gap-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300/60 dark:hover:bg-zinc-700/60 transition-all duration-200 disabled:opacity-50 shrink-0"
                    >
                      {uploadingFeatured ? (
                        <Spinner className="h-4 w-4" />
                      ) : (
                        <Upload size={16} />
                      )}
                      {uploadingFeatured ? "Enviando..." : "Upload"}
                    </button>
                  </div>
                  {featuredImage && (
                    <div className="relative mt-3 rounded-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-900 group w-fit max-w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featuredImage}
                        alt="Preview"
                        className="h-32 w-auto object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFeaturedImage("")}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Screenshots */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Screenshots
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={screenshotInput}
                      onChange={(e) => setScreenshotInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addScreenshot())
                      }
                      className="flex-1 rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 dark:focus:ring-zinc-600/40 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
                      placeholder="https://cdn.cosmicjs.com/screenshot.jpg"
                    />
                    <button
                      type="button"
                      onClick={addScreenshot}
                      className="rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300/60 dark:hover:bg-zinc-700/60 transition-all duration-200 shrink-0"
                    >
                      Add URL
                    </button>
                    <input
                      ref={screenshotInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => screenshotInputRef.current?.click()}
                      disabled={uploadingScreenshot}
                      className="inline-flex items-center gap-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300/60 dark:hover:bg-zinc-700/60 transition-all duration-200 disabled:opacity-50 shrink-0"
                    >
                      {uploadingScreenshot ? (
                        <Spinner className="h-4 w-4" />
                      ) : (
                        <Upload size={16} />
                      )}
                      {uploadingScreenshot ? "Enviando..." : "Upload"}
                    </button>
                  </div>
                  {screenshots.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                      {screenshots.map((url, i) => (
                        <div
                          key={i}
                          className="relative group rounded-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-900/50 aspect-video"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={`Screenshot ${i + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200" />
                          <button
                            type="button"
                            onClick={() => removeScreenshot(i)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 scale-90 group-hover:scale-100"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Botões de ação */}
                <div className="flex gap-3 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-zinc-900/10 dark:shadow-white/5"
                  >
                    {submitting ? (
                      <Spinner className="h-4 w-4" />
                    ) : (
                      <Save size={16} />
                    )}
                    {submitting ? "Publicando..." : "Publicar Projeto"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-zinc-300/50 dark:border-zinc-700/50 px-6 py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-all duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lista de Projetos */}
        <div className="animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                Projetos Publicados
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {projects.length}{" "}
                {projects.length === 1 ? "projeto encontrado" : "projetos encontrados"}
              </p>
            </div>
          </div>

          {loadingProjects ? (
            <div className="flex flex-col items-center justify-center py-24 text-zinc-400">
              <Spinner className="h-8 w-8 mb-4" />
              <p className="text-sm">Carregando projetos...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 mb-4">
                <ImageIcon className="w-7 h-7 text-zinc-400" />
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                Nenhum projeto publicado
              </p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                Clique em &quot;Novo Projeto&quot; para começar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project, idx) => {
                const thumb =
                  project.metadata?.featured_image?.url ||
                  (project.metadata as any)?.featured_image_url;
                return (
                  <div
                    key={project.slug}
                    className="group flex items-center gap-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm p-5 hover:border-zinc-300/60 dark:hover:border-zinc-700/60 hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-zinc-200/10 dark:hover:shadow-black/10 transition-all duration-300"
                    style={{
                      animationDelay: `${idx * 50}ms`,
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 shrink-0">
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-zinc-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                          {project.title || project.metadata?.title}
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 hidden sm:inline">
                          /{project.slug}
                        </span>
                      </div>
                      {project.metadata?.short_description && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                          {project.metadata.short_description}
                        </p>
                      )}
                      {project.metadata?.tech_stack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {project.metadata.tech_stack
                            .slice(0, 4)
                            .map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 text-[10px] font-medium tracking-wider rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 border border-zinc-300/40 dark:border-zinc-700/40"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.metadata.tech_stack.length > 4 && (
                            <span className="px-2 py-0.5 text-[10px] text-zinc-400">
                              +{project.metadata.tech_stack.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {project.metadata?.live_url && (
                        <a
                          href={project.metadata.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-all duration-200"
                          title="Abrir site"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.metadata?.github_url && (
                        <a
                          href={project.metadata.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-all duration-200"
                          title="Ver código"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

