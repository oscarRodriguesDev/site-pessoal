"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { LogOut, Plus, X, ExternalLink, Github, Trash2 } from "lucide-react";

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
    // Limpa o cookie e redireciona
    document.cookie =
      "admin_token=; path=/admins; max-age=0; SameSite=Lax";
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
        message: `Projeto "${title}" criado com sucesso!`,
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

      // Recarregar lista
      fetchProjects();
    } catch {
      setFeedback({ type: "error", message: "Erro de conexão" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <div>
            <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              Admin Panel
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Gerencie seus projetos do portfólio
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            >
              <Plus size={16} />
              {showForm ? "Cancelar" : "Novo Projeto"}
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:border-zinc-500 transition-colors"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 py-8 mx-auto max-w-5xl">
        {/* Feedback */}
        {feedback && (
          <div
            className={`mb-6 rounded-xl border px-5 py-4 text-sm flex items-center justify-between ${
              feedback.type === "success"
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
            }`}
          >
            <span>{feedback.message}</span>
            <button
              onClick={() => setFeedback(null)}
              className="ml-4 opacity-60 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Formulário */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-6">
              Novo Projeto
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Título e Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                    placeholder="Meu Projeto Incrível"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 font-mono"
                    placeholder="meu-projeto-incrivel"
                    required
                  />
                </div>
              </div>

              {/* Descrições */}
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Descrição Curta
                </label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                  placeholder="Uma breve descrição do projeto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Descrição Completa
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 resize-y"
                  placeholder="Descreva o projeto em detalhes..."
                />
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                    URL do Projeto (Live)
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                    placeholder="https://meu-projeto.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                    URL do GitHub
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Tecnologias
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                    className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                    placeholder="React, Next.js, TypeScript..."
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="rounded-xl bg-zinc-200 dark:bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400"
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
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  URL da Imagem de Destaque
                </label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                  placeholder="https://cdn.cosmicjs.com/minha-imagem.jpg"
                />
              </div>

              {/* Screenshots */}
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Screenshots (URLs)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={screenshotInput}
                    onChange={(e) => setScreenshotInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addScreenshot())}
                    className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                    placeholder="https://cdn.cosmicjs.com/screenshot.jpg"
                  />
                  <button
                    type="button"
                    onClick={addScreenshot}
                    className="rounded-xl bg-zinc-200 dark:bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {screenshots.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    {screenshots.map((url, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2 text-xs text-zinc-500 dark:text-zinc-400"
                      >
                        <span className="flex-1 truncate">{url}</span>
                        <button
                          type="button"
                          onClick={() => removeScreenshot(i)}
                          className="text-zinc-400 hover:text-red-500 transition-colors shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-zinc-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Publicando..." : "Publicar Projeto"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Projetos */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            Projetos Publicados
            <span className="ml-2 text-sm font-normal text-zinc-400">
              ({projects.length})
            </span>
          </h2>

          {loadingProjects ? (
            <div className="flex items-center justify-center py-16 text-zinc-400">
              <div className="animate-spin h-6 w-6 border-2 border-zinc-300 dark:border-zinc-600 border-t-zinc-600 dark:border-t-zinc-300 rounded-full mr-3" />
              Carregando...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 dark:text-zinc-400">
                Nenhum projeto publicado ainda.
              </p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                Clique em &quot;Novo Projeto&quot; para começar.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="flex items-center gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                      {project.title || project.metadata?.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                      /{project.slug}
                    </p>
                    {project.metadata?.tech_stack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.metadata.tech_stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
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
                  <div className="flex items-center gap-2 shrink-0">
                    {project.metadata?.live_url && (
                      <a
                        href={project.metadata.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
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
                        className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                        title="Ver código"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
