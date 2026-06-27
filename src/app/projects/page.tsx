import { Navigation } from "@/components/nav";
import { ProjectCard } from "./components";

export const dynamic = "force-dynamic";

async function getProjects(): Promise<any[]> {
  const apiUrl = process.env.API_URL;
  const readKey = process.env.COSMIC_READ_KEY;

  if (!apiUrl || !readKey) return [];

  try {
    const url = `${apiUrl}objects?read_key=${readKey}&type=projects&props=slug,title,type,metadata`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.objects ?? [];
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-transparent to-transparent" />

        <div className="relative px-6 mx-auto max-w-7xl">
          <div className="max-w-2xl mb-12 lg:mb-16 animate-fade-in">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase border rounded-full text-zinc-400 border-zinc-700/50 bg-zinc-900/50">
              Portfólio
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Meus Projetos
            </h1>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Confira alguns dos projetos que desenvolvi ao longo da minha
              carreira como desenvolvedor.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 border rounded-full border-zinc-800 bg-zinc-900/50">
                <span className="text-2xl text-zinc-600">!</span>
              </div>
              <p className="text-zinc-500">
                Nenhum projeto encontrado. Crie objetos do tipo &quot;projects&quot; no Cosmic JS.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-up">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.metadata.title}
                  description={project.metadata.short_description}
                  imagesUrl={[
                    ...(project.metadata.featured_image?.url ? [project.metadata.featured_image.url] : []),
                    ...(project.metadata.screenshots?.map((s: any) => s.url) ?? []),
                  ]}
                  liveUrl={project.metadata.live_url}
                  githubUrl={project.metadata.github_url}
                  techStack={project.metadata.tech_stack}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
