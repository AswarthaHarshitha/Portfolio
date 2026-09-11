import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

/**
 * Scroll-linked vertical drift for ambient background elements — different
 * elements moving at different speeds as the page scrolls is what actually
 * reads as depth/parallax, rather than a flat background that scrolls 1:1
 * with the content in front of it.
 */
export function useParallax(speed = 60) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return { ref, y };
}
