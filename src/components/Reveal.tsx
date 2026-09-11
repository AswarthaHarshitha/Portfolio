import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: -32 },
  right: { x: 32 },
  none: {},
};

// A slight rotation on the way in — paired with transformPerspective below —
// makes each section feel like it's tilting into place out of real depth
// rather than just sliding/fading, without being gimmicky at rest (0deg).
const TILT: Record<Direction, { rotateX?: number; rotateY?: number }> = {
  up: { rotateX: -10 },
  down: { rotateX: 10 },
  left: { rotateY: 8 },
  right: { rotateY: -8 },
  none: {},
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  depth = true,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Adds a subtle 3D rotation on entrance. Set false for flat fade/slide only. */
  depth?: boolean;
  className?: string;
}) {
  const offset = OFFSETS[direction];
  const tilt = depth ? TILT[direction] : {};
  const variants: Variants = {
    hidden: { opacity: 0, ...offset, ...tilt },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      style={depth ? { transformPerspective: 900 } : undefined}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
