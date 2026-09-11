import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { GithubIcon } from "../components/icons";
import { projects, highlightTech, type Project } from "../data/projects";
import Reveal from "../components/Reveal";
import { cx } from "../lib/utils";

// Curated, in order — only projects with a real, reachable live demo and an
// honest screenshot of the actual product (not just a login wall) belong here.
const SHOWCASE_IDS = ["clinicalnote", "mic-elms", "pdf-highlighter", "gesture-game"];

const showcase = SHOWCASE_IDS.map((id) => projects.find((p) => p.id === id)).filter(
  (p): p is Project => Boolean(p && p.image)
);

function hostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function FeaturedShowcase() {
  const [[index, dir], setIndex] = useState<[number, number]>([0, 0]);
  if (showcase.length === 0) return null;

  const project = showcase[index];
  const go = (rawNext: number) => {
    const direction = rawNext > index ? 1 : rawNext < index ? -1 : 0;
    const n = ((rawNext % showcase.length) + showcase.length) % showcase.length;
    setIndex([n, direction || 1]);
  };

  return (
    <section id="work" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-accent/[0.08] blur-[150px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal direction="up">
          <h2 className="font-display text-[11vw] sm:text-6xl lg:text-7xl leading-[0.95] text-center mb-16 sm:mb-20 bg-gradient-to-b from-foreground via-foreground to-muted-2 bg-clip-text text-transparent">
            Work that makes an impact.
          </h2>
        </Reveal>

        <div className="relative">
          {/* peeking neighbors */}
          {showcase.length > 1 && (
            <>
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous project"
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[78%] w-[260px] h-[180px] rounded-2xl overflow-hidden opacity-30 hover:opacity-50 transition-opacity blur-[1px]"
              >
                <img
                  src={showcase[(index - 1 + showcase.length) % showcase.length].image}
                  alt=""
                  className="h-full w-full object-cover object-top"
                />
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next project"
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-[78%] w-[260px] h-[180px] rounded-2xl overflow-hidden opacity-30 hover:opacity-50 transition-opacity blur-[1px]"
              >
                <img
                  src={showcase[(index + 1) % showcase.length].image}
                  alt=""
                  className="h-full w-full object-cover object-top"
                />
              </button>
            </>
          )}

          <div className="relative mx-auto max-w-3xl">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={project.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -dir * 60 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* browser mockup */}
                <div className="rounded-2xl border border-border-strong bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-background-elevated">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    {project.demo && (
                      <span className="ml-3 text-xs text-muted-2 truncate">{hostname(project.demo)}</span>
                    )}
                  </div>
                  <div className="relative aspect-[16/10] bg-background-elevated">
                    <img src={project.image} alt={`${project.title} preview`} className="h-full w-full object-cover object-top" />
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-4 py-2 text-xs font-semibold border border-border-strong hover:border-accent hover:text-accent transition-colors"
                      >
                        View Live Project
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* meta */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                  <div>
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-accent font-medium">
                      <Plus size={12} />
                      {project.categories[0]}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl mt-3">{project.title}</h3>
                    <p className="text-muted mt-2 max-w-lg text-sm sm:text-base leading-relaxed">{project.tagline}</p>
                  </div>
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    {highlightTech(project).map((t) => (
                      <span
                        key={t}
                        className="text-xs text-center px-3 py-1.5 rounded-full border border-border-strong text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* controls */}
        {showcase.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous project"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {showcase.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => go(i)}
                  aria-label={`Go to ${p.title}`}
                  className={cx(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-border-strong hover:bg-muted"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next project"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-2 hover:text-accent transition-colors"
          >
            <GithubIcon size={13} />
            View source on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
