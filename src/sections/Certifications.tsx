import { motion } from "framer-motion";
import { certifications } from "../data/certifications";
import CertificationCard from "../components/CertificationCard";
import Reveal from "../components/Reveal";
import { useParallax } from "../lib/useParallax";

const staggerDelay = (i: number) => Math.min(i, 9) * 0.06;

export default function Certifications() {
  const blob = useParallax(-45);

  return (
    <section id="certifications" className="relative py-28 sm:py-36 border-t border-border overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          ref={blob.ref}
          style={{ y: blob.y }}
          className="absolute top-0 right-1/3 h-[360px] w-[460px] rounded-full bg-sky-500/[0.06] blur-[130px]"
        />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-0 font-display text-[26vw] sm:text-[14vw] lg:text-[10rem] leading-none text-foreground/[0.03]"
      >
        05
      </span>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <Reveal direction="up">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Credentials</span>
              <h2 className="font-display text-4xl sm:text-5xl mt-4">Certifications</h2>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="text-muted max-w-sm text-sm sm:text-base">
              Verified credentials across cloud, enterprise, and AI.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((c, i) => (
            <Reveal key={c.id} direction="up" delay={staggerDelay(i)}>
              <CertificationCard certification={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
