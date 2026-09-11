import { motion } from "framer-motion";
import { publications } from "../data/publications";
import PublicationCard from "../components/PublicationCard";
import Reveal from "../components/Reveal";
import { useParallax } from "../lib/useParallax";

const staggerDelay = (i: number) => Math.min(i, 7) * 0.07;

export default function Publications() {
  const blob = useParallax(55);

  return (
    <section id="publications" className="relative py-28 sm:py-36 border-t border-border overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          ref={blob.ref}
          style={{ y: blob.y }}
          className="absolute bottom-0 left-1/4 h-[380px] w-[500px] rounded-full bg-accent/[0.07] blur-[140px]"
        />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-0 font-display text-[26vw] sm:text-[14vw] lg:text-[10rem] leading-none text-foreground/[0.03]"
      >
        04
      </span>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <Reveal direction="up">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Research</span>
              <h2 className="font-display text-4xl sm:text-5xl mt-4">Publications</h2>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="text-muted max-w-sm text-sm sm:text-base">
              Peer-reviewed work published with IEEE.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {publications.map((p, i) => (
            <Reveal key={p.id} direction="up" delay={staggerDelay(i)}>
              <PublicationCard publication={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
