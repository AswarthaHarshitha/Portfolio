import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import TiltGlare from "./TiltGlare";
import { useTilt } from "../lib/useTilt";
import type { Project } from "../data/projects";

export default function ProjectCard({
  project,
  featured = false,
  onOpenDetails,
}: {
  project: Project;
  featured?: boolean;
  onOpenDetails?: (project: Project) => void;
}) {
  const tilt = useTilt();
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onClick={() => onOpenDetails?.(project)}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 800 }}
      className={
        "group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 sm:p-7 hover:border-accent/50 hover:bg-surface-hover hover:shadow-[0_16px_50px_-20px_var(--color-accent)] transition-[border-color,background-color,box-shadow] duration-300 " +
        (onOpenDetails ? "cursor-pointer " : "") +
        (featured ? "lg:p-8" : "")
      }
    >
      <TiltGlare x={tilt.glareX} y={tilt.glareY} opacity={tilt.glareOpacity} />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="relative shrink-0">
            <div
              className="absolute inset-0 rounded-full bg-accent/25 blur-lg scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div
              className={
                "relative rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center overflow-hidden group-hover:border-accent/40 transition-colors duration-300 " +
                (featured ? "h-14 w-14" : "h-11 w-11")
              }
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  aria-hidden="true"
                />
              ) : (
                <span className={featured ? "text-2xl" : "text-lg"} aria-hidden="true">
                  {project.emoji}
                </span>
              )}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className={featured ? "font-display text-2xl sm:text-3xl" : "font-semibold text-lg"}>
              {project.title}
            </h3>
            <p className="text-sm text-accent mt-1">{project.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-colors"
            aria-label={`${project.title} on GitHub`}
          >
            <GithubIcon size={16} />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-colors"
              aria-label={`${project.title} live demo`}
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>

      <p className={"text-muted mt-4 leading-relaxed " + (featured ? "text-sm sm:text-base" : "text-sm")}>
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full border border-border-strong text-muted-2 group-hover:text-muted transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
