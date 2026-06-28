import { Navigation } from "@/components/nav";
import { Card } from "@/components/card";
import Image from "next/image";
import {
  FaReact,
  FaPython,
  FaJava,
  FaNodeJs,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";
import profile from "../../../public/profilepictures.png";

const skills = [
  { name: "React", icon: <FaReact size={16} /> },
  { name: "Next.js", icon: <SiNextdotjs size={16} /> },
  { name: "TypeScript", icon: <SiTypescript size={16} /> },
  { name: "JavaScript", icon: <SiTypescript size={16} /> },
  { name: "Python", icon: <FaPython size={16} /> },
  { name: "Java", icon: <FaJava size={16} /> },
  { name: "Node.js", icon: <FaNodeJs size={16} /> },
  { name: "Express", icon: <SiExpress size={16} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={16} /> },
  { name: "MongoDB", icon: <SiMongodb size={16} /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={16} /> },
  { name: "Docker", icon: <SiDocker size={16} /> },
  { name: "Figma", icon: <FaFigma size={16} /> },
];

const highlights = [
  { title: "Ágil", desc: "Entregas rápidas sem perder qualidade" },
  { title: "Eficiente", desc: "Soluções otimizadas que realmente funcionam" },
  { title: "Confiável", desc: "Código limpo, seguro e bem documentado" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <div className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-200/20 via-transparent to-transparent dark:from-zinc-900/20" />

        <div className="relative px-6 mx-auto max-w-7xl">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-16 animate-fade-in">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-700 blur-md opacity-50" />
              <Image
                src={profile}
                alt="Oscar Rodrigues"
                className="relative w-28 h-28 rounded-full border-2 border-zinc-700 object-cover"
                width={112}
                height={112}
              />
            </div>
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-4xl">
              Oscar Rodrigues
            </h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">Desenvolvedor FullStack</p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-16 animate-fade-up">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center p-4 border rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800/50"
              >
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  {item.title}
                </span>
                <span className="mt-1 text-[11px] text-zinc-500 text-center leading-relaxed">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="max-w-3xl mx-auto mb-16 space-y-6 animate-fade-up">
            <Card>
              <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                  Quem sou
                </h2>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Desenvolvedor Full Stack com mais de 12 anos de experiência no desenvolvimento
                  de sistemas web, plataformas SaaS, APIs REST, dashboards administrativos,
                  automações, integrações e soluções sob medida para empresas de diversos
                  segmentos. Atuo em todas as etapas do desenvolvimento, desde a arquitetura da
                  aplicação e modelagem de banco de dados até a implantação, monitoramento e
                  manutenção em ambientes de produção, sempre priorizando performance,
                  escalabilidade, segurança e qualidade de código.
                </p>

                <p className="text-sm leading-relaxed text-zinc-400">
                  Tenho domínio em Next.js, React, Node.js, TypeScript, JavaScript, Prisma,
                  PostgreSQL, MySQL, Docker, Git, Linux e arquitetura de aplicações modernas.
                  Possuo ampla experiência na criação de sistemas administrativos, e-commerces,
                  marketplaces, ERPs, CRMs, portais corporativos, autenticação, controle de
                  permissões, processamento de pagamentos, consumo e desenvolvimento de APIs,
                  além de integrações com serviços de terceiros, automação de processos e
                  implementação de soluções baseadas em Inteligência Artificial.
                </p>

                <p className="text-sm leading-relaxed text-zinc-400">
                  Sou especialista em Desenvolvimento de Sistemas Web, Gestão de Projetos com
                  foco em Inovação e Ferramentas Tecnológicas e Data Protection Officer (DPO).
                  Também atuo com Engenharia de Prompts, desenvolvimento de agentes de IA,
                  chatbots inteligentes, automação de fluxos de trabalho e integração de modelos
                  de linguagem em aplicações corporativas, transformando processos manuais em
                  soluções inteligentes e escaláveis.
                </p>

                <p className="text-sm leading-relaxed text-zinc-400">
                  Minha experiência também inclui infraestrutura, DevOps, deploy em VPS e
                  servidores Linux, Docker, arquitetura de software, segurança da informação e
                  conformidade com a LGPD. Além do desenvolvimento de sistemas, produzo
                  conteúdos para mídias digitais utilizando Inteligência Artificial, criando
                  imagens, vídeos, peças publicitárias, identidade visual, conteúdos para redes
                  sociais e trilhas sonoras personalizadas para campanhas, empresas e produtos,
                  combinando criatividade com tecnologia para entregar soluções completas.
                </p>
              </div>
            </Card>
          </div>

          {/* Skills */}
          <div className="max-w-3xl mx-auto animate-fade-up">
            <h2 className="mb-6 text-lg font-semibold text-center text-zinc-800 dark:text-zinc-100">
              Tecnologias & Ferramentas
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 border rounded-full text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-900/50 hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800/50"
                >
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
