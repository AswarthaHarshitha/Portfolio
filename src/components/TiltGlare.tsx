import { motion, useMotionTemplate, type MotionValue } from "framer-motion";

/** The moving light-reflection overlay for `useTilt` cards — extracted since
 * three card components share the exact same glare treatment. */
export default function TiltGlare({
  x,
  y,
  opacity,
}: {
  x: MotionValue<string>;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
}) {
  const background = useMotionTemplate`radial-gradient(320px circle at ${x} ${y}, var(--color-accent) 0%, transparent 60%)`;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={{ opacity, background, mixBlendMode: "overlay" }}
    />
  );
}
