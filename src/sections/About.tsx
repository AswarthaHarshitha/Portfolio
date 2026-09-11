import { motion } from "framer-motion";
import { BarChart3, Bot, Building2, Cloud, Code2, Eye } from "lucide-react";
import { profile, coreExpertise } from "../data/profile";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import { useParallax } from "../lib/useParallax";

// Projects on GitHub is a hand-set total (the full repo count), not the curated
// subset shown in the Projects section — keep it in sync with the real count.
const stats = [
  { value: 35, suffix: "+", label: "Projects on GitHub" },
  { value: 8, suffix: "", label: "Domains covered" },
  { value: 100, suffix: "%", label: "Real, working code" },
];

const EXPERTISE_ICONS = [Code2, Bot, BarChart3, Eye, Building2, Cloud];

export default function About() {
  const blobA = useParallax(50);
  const blobB = useParallax(-40);

  return (
    <section id="about" className="relative py-28 sm:py-36 overflow-hidden">
      {/* ambient background, echoes the hero — each blob drifts at its own
          speed while scrolling, so the backdrop reads as real depth */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          ref={blobA.ref}
          style={{ y: blobA.y }}
          className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]"
        />
        <motion.div
          ref={blobB.ref}
          style={{ y: blobB.y }}
          className="absolute bottom-0 right-0 h-[360px] w-[460px] rounded-full bg-sky-500/[0.06] blur-[130px]"
        />
      </div>

      {/* oversized ghost numeral for cinematic depth */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 sm:-top-10 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 font-display text-[34vw] sm:text-[22vw] lg:text-[16rem] leading-none text-foreground/[0.03]"
      >
        01
      </span>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
          <div>
            <Reveal direction="down">
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">About</span>
            </Reveal>

            <h2 className="font-display text-4xl sm:text-5xl mt-4 mb-8 leading-[1.05] overflow-hidden">
              <Reveal direction="up" delay={0.05}>
                <span className="block">Engineering things</span>
              </Reveal>
              <Reveal direction="up" delay={0.16}>
                <span className="block text-gradient-accent">that actually run.</span>
              </Reveal>
            </h2>

            <div className="grid grid-cols-3 gap-4 max-w-sm">
              {stats.map((s, i) => (
                <Reveal key={s.label} direction="up" delay={0.28 + i * 0.09}>
                  <div className="border-t border-border pt-3">
                    <div className="font-display text-2xl text-accent">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-muted mt-1 leading-snug">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <div className="space-y-5 text-muted font-body text-base sm:text-lg leading-relaxed">
              {profile.bio.map((p, i) => (
                <Reveal key={i} direction="left" delay={i * 0.12}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {coreExpertise.map((item, i) => {
                const Icon = EXPERTISE_ICONS[i % EXPERTISE_ICONS.length];
                return (
                  <Reveal key={item.label} direction="up" delay={0.1 + i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group h-full rounded-2xl border border-border bg-surface/60 p-5 hover:border-accent/50 hover:shadow-[0_12px_40px_-16px_var(--color-accent)] transition-[border-color,box-shadow] duration-300"
                    >
                      <div className="h-9 w-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                        <Icon size={17} />
                      </div>
                      <div className="font-semibold text-foreground">{item.label}</div>
                      <div className="text-sm text-muted mt-1.5">{item.detail}</div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
