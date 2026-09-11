import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChefHat, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/icons";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { publications } from "../data/publications";
import { certifications } from "../data/certifications";
import { useMagnetic } from "../lib/useMagnetic";

// three.js + @react-three/fiber + @react-three/rapier are the single biggest
// contributor to the JS bundle — split into their own chunk, loaded only when
// the scene actually renders (skipped already below ~640px), instead of
// blocking parse/execute of the main bundle on every visit.
const HeroScene = lazy(() => import("../three/HeroScene"));

const quickStats = [
  `${projects.length}+ Projects Shipped`,
  `${publications.length} IEEE Publication${publications.length === 1 ? "" : "s"}`,
  `${certifications.length} Certifications`,
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const [dense, setDense] = useState(true);
  // The physics scene needs enough horizontal room for chips to settle without
  // jamming against the walls, and a WASM physics sim isn't worth the battery
  // cost on small phones anyway — skip it below this width.
  const [showScene, setShowScene] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const viewCta = useMagnetic();
  const contactCta = useMagnetic();

  // As the hero scrolls out of view, sink the 3D scene and text back into
  // depth (scale down, drift down, fade) rather than just letting it cut off —
  // the "4D" read comes from things receding on a Z-axis, not just sliding.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    setDense(window.innerWidth > 768);
    setShowScene(window.innerWidth >= 640);
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative min-h-screen flex flex-col overflow-hidden pt-16">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[560px] w-[860px] rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[500px] rounded-full bg-sky-500/10 blur-[130px]" />
      </div>

      {showScene && (
        <motion.div className="absolute inset-0 -z-0" style={{ scale: sceneScale, opacity: sceneOpacity }}>
          <Suspense fallback={null}>
            <HeroScene dense={dense} />
          </Suspense>
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex-1 mx-auto max-w-6xl w-full px-5 sm:px-8 flex flex-col justify-center pointer-events-none"
      >
        <motion.p
          variants={item}
          className="pointer-events-auto text-xs sm:text-sm uppercase tracking-[0.25em] text-accent font-medium mb-5"
        >
          {profile.availability}
        </motion.p>

        <motion.h1
          variants={item}
          className="pointer-events-auto font-display text-[13vw] sm:text-[7.5vw] lg:text-[6vw] leading-[0.92] uppercase text-gradient-accent"
        >
          {profile.name}
        </motion.h1>

        <motion.p variants={item} className="pointer-events-auto mt-6 max-w-xl text-base sm:text-lg text-muted font-body">
          {profile.title} — {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4">
          <motion.a
            href="#projects"
            onMouseMove={viewCta.onMouseMove}
            onMouseLeave={viewCta.onMouseLeave}
            style={{ x: viewCta.x, y: viewCta.y }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:bg-accent-soft transition-colors"
          >
            View Projects
            <ArrowUpRight size={16} />
          </motion.a>
          <motion.a
            href="#contact"
            onMouseMove={contactCta.onMouseMove}
            onMouseLeave={contactCta.onMouseLeave}
            style={{ x: contactCta.x, y: contactCta.y }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
          >
            Get In Touch
          </motion.a>
          <div className="flex items-center gap-3 ml-1">
            <motion.a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, rotate: -6 }}
              whileTap={{ scale: 0.95 }}
              className="h-11 w-11 flex items-center justify-center rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </motion.a>
            <motion.a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.95 }}
              className="h-11 w-11 flex items-center justify-center rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </motion.a>
            {profile.links.leetcode && (
              <motion.a
                href={profile.links.leetcode}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, rotate: -6 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 flex items-center justify-center rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                aria-label="LeetCode"
              >
                <Code2 size={18} />
              </motion.a>
            )}
            {profile.links.codechef && (
              <motion.a
                href={profile.links.codechef}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 flex items-center justify-center rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                aria-label="CodeChef"
              >
                <ChefHat size={18} />
              </motion.a>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="pointer-events-auto mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-muted-2"
        >
          {quickStats.map((stat, i) => (
            <span key={stat} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden="true" />}
              {stat}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative mx-auto mb-8 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-2 hover:text-accent transition-colors animate-float"
      >
        Scroll
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
