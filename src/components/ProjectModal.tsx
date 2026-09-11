import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "../data/projects";

export default function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project | null;
  onClose: () => void;
  /** Optional — when provided, arrow keys and on-screen chevrons step through
   * the surrounding project list without closing the modal. */
  onPrev?: () => void;
  onNext?: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous project"
              className="hidden sm:flex absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface/80 text-muted hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next project"
              className="hidden sm:flex absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface/80 text-muted hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          )}

          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border-strong bg-surface p-6 sm:p-9 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-5 right-5 h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-colors"
            >
              <X size={16} />
            </button>

            <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">
              {project.categories[0]}
              {project.year ? ` · ${project.year}` : ""}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mt-3 pr-10">{project.title}</h2>
            <p className="text-accent text-sm sm:text-base mt-2">{project.tagline}</p>

            <p className="text-muted leading-relaxed mt-6 text-sm sm:text-base">{project.description}</p>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-2 mb-2.5">Tech stack</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full border border-border-strong text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.categories.length > 1 && (
              <div className="mt-5">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-2 mb-2.5">Categories</div>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((c) => (
                    <span key={c} className="text-xs px-2.5 py-1 rounded-full border border-border-strong text-muted">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold hover:bg-accent-soft transition-colors"
              >
                <GithubIcon size={16} />
                View Source
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
                >
                  Live Demo
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>

            {(onPrev || onNext) && (
              <div className="flex sm:hidden items-center justify-between mt-8 pt-5 border-t border-border-strong">
                <button
                  onClick={() => onPrev?.()}
                  disabled={!onPrev}
                  className="inline-flex items-center gap-1 text-sm text-muted disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>
                <button
                  onClick={() => onNext?.()}
                  disabled={!onNext}
                  className="inline-flex items-center gap-1 text-sm text-muted disabled:opacity-30"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
