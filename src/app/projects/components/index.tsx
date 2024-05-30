import Link from 'next/link';
import Image from 'next/image';

interface ProductProps {
  nome: string;
  description: string;
  url: string;
  link: string;
}

export function ProjectCard({ nome, description, url, link }: ProductProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black p-4 m-4 border border-gray-200 transform transition duration-500 group">
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gray-300 transition duration-500">{nome}</h3>
      <p className="text-gray-300 text-base mb-4 group-hover:text-gray-100 transition duration-500">{description}</p>
      <Image
        className="w-full h-64 object-cover rounded-md group-hover:brightness-110 transition duration-500"
        src={url}
        alt={nome}
        width={250}
        height={250}
      />
      <div className="flex justify-center mt-4 w-full">
        <a href={link} target="_blank" className="w-full text-center text-white bg-blue-500 py-2 block">
          Acesse
        </a>
      </div>
    </div>
  );
}
