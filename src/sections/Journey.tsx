import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react";
import { experience } from "../data/experience";
import { education } from "../data/education";
import Reveal from "../components/Reveal";
import { useParallax } from "../lib/useParallax";

export default function Journey() {
  const blob = useParallax(-40);

  return (
    <section id="journey" className="relative py-28 sm:py-36 border-t border-border overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          ref={blob.ref}
          style={{ y: blob.y }}
          className="absolute top-0 left-0 h-[360px] w-[460px] rounded-full bg-accent/[0.06] blur-[130px]"
        />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-0 font-display text-[26vw] sm:text-[14vw] lg:text-[10rem] leading-none text-foreground/[0.03]"
      >
        06
      </span>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal direction="up">
          <div className="mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Journey</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-4">Experience &amp; Education</h2>
          </div>
        </Reveal>

        {/* Experience */}
        <Reveal direction="up" delay={0.05}>
          <h3 className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted-2 mb-6">
            <Briefcase size={14} />
            Experience
          </h3>
        </Reveal>

        <div className="relative pl-6 sm:pl-8 border-l border-border space-y-8 mb-16">
          {experience.map((job, i) => (
            <Reveal key={job.organization} direction="up" delay={0.08 + i * 0.08}>
              <div className="relative">
                <span className="absolute -left-[calc(1.5rem+5px)] sm:-left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
                <div className="rounded-2xl border border-border bg-surface/60 p-6 hover:border-accent/50 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{job.role}</h4>
                      <p className="text-accent text-sm mt-0.5">{job.organization}</p>
                    </div>
                    <div className="text-xs text-muted-2 sm:text-right shrink-0 space-y-1">
                      {job.period && (
                        <div className="flex items-center gap-1.5 sm:justify-end">
                          <Calendar size={12} />
                          {job.period}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin size={12} />
                        {job.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted mt-4 leading-relaxed">{job.summary}</p>

                  <ul className="mt-4 space-y-1.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-muted leading-relaxed">
                        <span className="text-accent mt-[7px] h-1 w-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {job.subProjects?.map((proj) => (
                    <div key={proj.name} className="mt-4 pl-4 border-l-2 border-border-strong">
                      <div className="text-xs font-semibold uppercase tracking-wider text-accent">{proj.name}</div>
                      <ul className="mt-2 space-y-1.5">
                        {proj.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm text-muted leading-relaxed">
                            <span
                              className="text-accent mt-[7px] h-1 w-1 rounded-full bg-accent shrink-0"
                              aria-hidden="true"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-border-strong text-muted-2">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Education */}
        <Reveal direction="up" delay={0.05}>
          <h3 className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted-2 mb-6">
            <GraduationCap size={14} />
            Education
          </h3>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-4">
          {education.map((ed, i) => (
            <Reveal key={ed.degree} direction="up" delay={0.08 + i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-surface/60 p-5 hover:border-accent/50 transition-colors duration-300">
                <div className="text-xs text-muted-2">{ed.period}</div>
                <h4 className="font-semibold text-foreground mt-1.5">{ed.degree}</h4>
                <p className="text-sm text-muted mt-1">{ed.institution}</p>
                <p className="text-sm text-accent mt-3 font-medium">{ed.score}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
