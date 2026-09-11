import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import TiltGlare from "./TiltGlare";
import { useTilt } from "../lib/useTilt";
import type { Publication } from "../data/publications";

export default function PublicationCard({ publication }: { publication: Publication }) {
  const tilt = useTilt();
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 800 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 sm:p-7 hover:border-accent/50 hover:bg-surface-hover hover:shadow-[0_16px_50px_-20px_var(--color-accent)] transition-[border-color,background-color,box-shadow] duration-300"
    >
      <TiltGlare x={tilt.glareX} y={tilt.glareY} opacity={tilt.glareOpacity} />
      <div className="flex items-start justify-between gap-4">
        <div className="h-9 w-9 shrink-0 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
          <FileText size={16} />
        </div>
        <a
          href={publication.url}
          target="_blank"
          rel="noreferrer"
          className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-colors shrink-0"
          aria-label={`${publication.title} on IEEE Xplore`}
        >
          <ExternalLink size={16} />
        </a>
      </div>

      <h3 className="font-semibold text-lg mt-4 leading-snug">{publication.title}</h3>
      <p className="text-sm text-accent mt-1.5">{publication.authors}</p>

      <p className="text-muted mt-4 leading-relaxed text-sm">{publication.abstract}</p>

      <div className="mt-5 pt-5 border-t border-border-strong text-xs text-muted-2 space-y-1">
        <p>{publication.venue}</p>
        <p>
          {publication.location} &middot; {publication.date}
        </p>
        <p className="font-mono">DOI: {publication.doi}</p>
      </div>
    </motion.article>
  );
}
