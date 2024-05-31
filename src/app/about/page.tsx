import { Navigation } from "@/components/nav";
import { Card } from '@/components/card';
import Image from "next/image";
import profile from '../../../public/profilepictures.jpg';

export default function About() {
    return (
        <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 mt-20">
            <Navigation />
            <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
                <Card>
                    <div className="flex flex-col items-center mt-20">
                        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4">
                            <Image src={profile} alt="profile" className="w-24 h-24 rounded-full bg-gray-200 mb-4 mt-1" width={200} />
                        </div>
                        <h1 className="text-xl font-semibold mb-2">Oscar Rodrigues</h1>
                        <h2 className="text-base text-gray-400">Desenvolvedor FullStack</h2>
                    </div>
                    <div className="mt-4 px-4 lg:px-64 text-center">
                        <p className="leading-loose text-sm text-gray-400">
                            Especialista em desenvolvimento de aplicações web com 12 anos de experiência na área de tecnologia.
                            Possuo graduação em Análise e Desenvolvimento de Sistemas e atualmente desempenho o papel de Gestor na Dikma Digital,
                            uma startup de inovação, e sou o DPO do grupo Dikma, onde garanto a conformidade com a Lei Geral de Proteção de Dados (LGPD),
                            área na qual estou também buscando minha segunda especialização. Minha experiência abrange comunicação organizacional,
                            marketing digital, criação de sites, aplicativos e sistemas, com foco em atender demandas home office.
                        </p>
                    </div>
                    <div className="mt-4 px-4 lg:px-64 text-center">
                        <p className="leading-loose text-sm text-gray-400">
                            Tenho ampla experiência com diversas linguagens de programação, incluindo Python, Java, React, Next.js, JavaScript, TypeScript e Express.
                            Além disso, estou concentrando minha energia e estudos em inteligência artificial, visando integrar essas tecnologias emergentes nas soluções que desenvolvo.
                        </p>
                        <p className="leading-loose text-sm text-gray-400">
                            Minhas áreas de interesse incluem análise de dados, LGPD, trabalho remoto e análise de sistemas. Estou comprometido em aprimorar continuamente minhas habilidades e conhecimentos
                            para proporcionar soluções inovadoras e eficazes em todas as minhas atividades profissionais.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
