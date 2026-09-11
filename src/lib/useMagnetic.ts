import { useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

const SPRING = { stiffness: 200, damping: 18, mass: 0.4 };

/**
 * Pulls an element a few pixels toward the cursor while hovered — the
 * "magnetic button" effect. Spread the returned handlers/style onto a
 * `motion.*` element; snaps back to center on mouse leave.
 */
export function useMagnetic(strength = 0.35, max = 14) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-max, Math.min(max, relX * strength)));
    y.set(Math.max(-max, Math.min(max, relY * strength)));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { x: springX, y: springY, onMouseMove, onMouseLeave };
}
