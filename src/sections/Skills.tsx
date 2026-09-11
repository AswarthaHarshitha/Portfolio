import { motion } from "framer-motion";
import { skillGroups, allSkills } from "../data/skills";
import Reveal from "../components/Reveal";
import { useParallax } from "../lib/useParallax";

export default function Skills() {
  const blob = useParallax(45);

  return (
    <section id="skills" className="relative py-28 sm:py-36 border-t border-border overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          ref={blob.ref}
          style={{ y: blob.y }}
          className="absolute top-1/2 -translate-y-1/2 left-0 h-[320px] w-[420px] rounded-full bg-accent/[0.06] blur-[130px]"
        />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-0 font-display text-[26vw] sm:text-[14vw] lg:text-[10rem] leading-none text-foreground/[0.03]"
      >
        02
      </span>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal direction="up">
          <div className="mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Toolbox</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-4">Tech Stack</h2>
          </div>
        </Reveal>
      </div>

      {/* infinite ticker of everything used across shipped projects */}
      <Reveal direction="none">
        <div className="relative w-full overflow-hidden marquee-fade mb-16">
          <div className="flex w-max animate-marquee">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="shrink-0 mx-2.5 rounded-full border border-border-strong px-4 py-2 text-sm text-muted whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} direction="up" delay={Math.min(i, 8) * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-surface/60 p-5 hover:border-accent/50 transition-colors duration-300">
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">{group.label}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-full border border-border-strong text-muted-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
