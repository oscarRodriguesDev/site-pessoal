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
import profile from "../../../public/profilepictures.jpg";

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
  { number: "12+", label: "Anos de Experiência" },
  { number: "50+", label: "Projetos Entregues" },
  { number: "10+", label: "Tecnologias Dominadas" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-transparent to-transparent" />

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
            <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
              Oscar Rodrigues
            </h1>
            <p className="mt-2 text-zinc-400">Desenvolvedor FullStack</p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-16 animate-fade-up">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center p-4 border rounded-xl bg-zinc-900/50 border-zinc-800/50"
              >
                <span className="text-2xl font-bold text-zinc-100">
                  {item.number}
                </span>
                <span className="mt-1 text-xs text-zinc-500 text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="max-w-3xl mx-auto mb-16 space-y-6 animate-fade-up">
            <Card>
              <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-zinc-100">
                  Quem sou
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Especialista em desenvolvimento de aplicações web com 12 anos
                  de experiência na área de tecnologia. Possuo graduação em
                  Análise e Desenvolvimento de Sistemas e atualmente desempenho o
                  papel de Gestor na Dikma Digital, uma startup de inovação, e
                  sou o DPO do grupo Dikma, onde garanto a conformidade com a
                  Lei Geral de Proteção de Dados (LGPD), área na qual estou
                  também buscando minha segunda especialização.
                </p>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Minha experiência abrange comunicação organizacional, marketing
                  digital, criação de sites, aplicativos e sistemas, com foco em
                  atender demandas home office. Estou comprometido em aprimorar
                  continuamente minhas habilidades e conhecimentos para
                  proporcionar soluções inovadoras e eficazes em todas as minhas
                  atividades profissionais.
                </p>
              </div>
            </Card>
          </div>

          {/* Skills */}
          <div className="max-w-3xl mx-auto animate-fade-up">
            <h2 className="mb-6 text-lg font-semibold text-center text-zinc-100">
              Tecnologias & Ferramentas
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 border rounded-full text-zinc-300 border-zinc-700/50 bg-zinc-900/50 hover:border-zinc-500 hover:text-zinc-100 hover:bg-zinc-800/50"
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
