"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  imagesUrl?: string[];
  liveUrl: string;
  githubUrl?: string | null;
  techStack?: string[];
}

export function ProjectCard({
  slug,
  title,
  description,
  imagesUrl,
  liveUrl,
  githubUrl,
  techStack,
}: ProjectCardProps) {
  const tags = techStack ?? [];
  const imgs = imagesUrl ?? [];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (imgs.length < 2 || paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imgs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [imgs.length, paused]);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/40 transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50">
      {/* Image Carousel */}
      <div
        className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-900"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {imgs.length > 0 ? (
          <>
            {imgs.map((url, i) => (
              <div
                key={url}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === current ? 1 : 0 }}
              >
                <Image
                  className="object-cover"
                  src={url}
                  alt={`${title} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
            {imgs.length > 1 && (
              <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {imgs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? 'w-4 bg-zinc-800 dark:bg-white' : 'w-1.5 bg-zinc-400/60 dark:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-400 dark:text-zinc-700">
            <span className="text-4xl font-bold opacity-30 dark:opacity-20">{title?.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-zinc-900 dark:via-zinc-900/20 opacity-60 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tech Stack */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full bg-zinc-200 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 transition-colors duration-300 group-hover:text-zinc-900 dark:group-hover:text-white">
          {title}
        </h3>
        <p className="flex-1 mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
          {description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 flex-1 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-all duration-300 border border-zinc-300 dark:border-zinc-700 rounded-xl hover:text-zinc-800 dark:hover:text-white hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              <FiExternalLink size={16} />
              Acessar
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 border rounded-xl text-zinc-400 dark:text-zinc-500 border-zinc-300 dark:border-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-500 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/30"
            >
              <FiGithub size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
