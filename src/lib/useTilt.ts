import { useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

const SPRING = { stiffness: 300, damping: 25, mass: 0.5 };

/**
 * Subtle pointer-driven 3D tilt for cards — spread the returned handlers/style
 * onto a `motion.*` element (with `transformPerspective` set) for a premium
 * hover feel. No-op until the pointer actually moves over the element.
 */
export function useTilt(max = 6) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  // Percent-based position for a CSS radial-gradient glare that tracks the
  // pointer, so the card reads as a lit, glossy surface rather than a flat
  // shape that merely rotates.
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glareOpacity = useSpring(0, SPRING);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    glareOpacity.set(1);
  };
  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return { rotateX, rotateY, glareX, glareY, glareOpacity, onMouseMove, onMouseLeave };
}
