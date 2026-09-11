import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import TiltGlare from "./TiltGlare";
import { useTilt } from "../lib/useTilt";
import type { Certification } from "../data/certifications";

export default function CertificationCard({ certification }: { certification: Certification }) {
  const tilt = useTilt(4);
  return (
    <motion.a
      href={certification.url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 800 }}
      className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 hover:border-accent/50 hover:bg-surface-hover hover:shadow-[0_12px_40px_-16px_var(--color-accent)] transition-[border-color,background-color,box-shadow] duration-300"
    >
      <TiltGlare x={tilt.glareX} y={tilt.glareY} opacity={tilt.glareOpacity} />
      <div className="relative shrink-0">
        <div
          className="absolute inset-0 rounded-full bg-accent/25 blur-lg scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />
        <div
          className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-accent/40 transition-[transform,border-color] duration-300"
          aria-hidden="true"
        >
          {certification.emoji}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-sm leading-snug">{certification.title}</h3>
        <p className="text-xs text-muted mt-1.5">
          {certification.issuer} &middot; {certification.date}
        </p>
      </div>

      <ExternalLink size={15} className="shrink-0 text-muted-2 group-hover:text-accent transition-colors mt-1" />
    </motion.a>
  );
}
