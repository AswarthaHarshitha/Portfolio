import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects, roleFilters, type Role } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import Reveal from "../components/Reveal";
import { cx } from "../lib/utils";
import { useParallax } from "../lib/useParallax";

// Stagger card reveals, but cap the delay so long grids don't take forever to finish animating in.
const staggerDelay = (i: number) => Math.min(i, 7) * 0.07;

export default function Projects() {
  const [active, setActive] = useState<Role | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const blob = useParallax(-50);

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.roles.includes(active));
  }, [active]);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  // Same order the grid renders in, so prev/next in the modal steps through
  // exactly what's currently on screen (respects the active role filter).
  const displayList = [...featured, ...rest];
  const selectedIndex = displayList.findIndex((p) => p.id === selectedId);
  const selected = selectedIndex >= 0 ? displayList[selectedIndex] : null;

  return (
    <section id="projects" className="relative py-28 sm:py-36 border-t border-border overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          ref={blob.ref}
          style={{ y: blob.y }}
          className="absolute top-0 right-1/4 h-[380px] w-[500px] rounded-full bg-accent/[0.07] blur-[140px]"
        />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-0 font-display text-[26vw] sm:text-[14vw] lg:text-[10rem] leading-none text-foreground/[0.03]"
      >
        03
      </span>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <Reveal direction="up">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Work</span>
              <h2 className="font-display text-4xl sm:text-5xl mt-4">Selected Projects</h2>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="text-muted max-w-sm text-sm sm:text-base">
              Filter by the kind of role you're hiring for — every project below links to real, working source on
              GitHub.
            </p>
          </Reveal>
        </div>

        <Reveal direction="up" delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-12">
            {roleFilters.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={cx(
                  "relative text-sm px-4 py-2 rounded-full border transition-colors",
                  active === r.id
                    ? "border-accent text-accent-foreground"
                    : "border-border text-muted hover:border-accent hover:text-accent"
                )}
              >
                {active === r.id && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{r.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {featured.map((p, i) => (
              <Reveal key={p.id} direction="up" delay={staggerDelay(i)}>
                <ProjectCard project={p} featured onOpenDetails={(proj) => setSelectedId(proj.id)} />
              </Reveal>
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p, i) => (
              <Reveal key={p.id} direction="up" delay={staggerDelay(i)}>
                <ProjectCard project={p} onOpenDetails={(proj) => setSelectedId(proj.id)} />
              </Reveal>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-muted text-center py-16">No projects tagged for this role yet.</p>
        )}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelectedId(null)}
        onPrev={selectedIndex > 0 ? () => setSelectedId(displayList[selectedIndex - 1].id) : undefined}
        onNext={
          selectedIndex >= 0 && selectedIndex < displayList.length - 1
            ? () => setSelectedId(displayList[selectedIndex + 1].id)
            : undefined
        }
      />
    </section>
  );
}
