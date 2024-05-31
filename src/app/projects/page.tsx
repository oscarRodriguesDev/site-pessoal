import React from "react";
import { Navigation } from "@/components/nav";
import { ProjectCard } from "./components";
import { getData } from "@/util/data";
import { ProductAndServicesProps } from "../types";
export const revalidate = 60;

export default async function ProjectsPage() {
    const urlapi = `${process.env.API_URL}objects/665686aeb6cce150ff0983b0?read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata`;
    const data: ProductAndServicesProps = await getData({ url_api: urlapi });
    const produtos = data.object.metadata.produto;



    return (
        <div className="relative pb-16">
            <Navigation />

            <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">

                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        Meus Projetos
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Confira alguns de meus projetos desenvolvidos ao longo da minha carreira como Dev, alguns em andamento outros
                        já finalizados.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto ' }} >
                    {produtos.map((item) => (

                        <ProjectCard

                            key={item.product_name}
                            nome={item.product_name}
                            description={item.description}
                            url={item.product_image.url}
                            link={item.link}

                        />

                    ))}
                </div>
                <div className="hidden w-full h-px md:block bg-zinc-800" />
            </div>

        </div>



    );
}
