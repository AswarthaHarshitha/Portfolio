import { motion } from "framer-motion";
import { ChefHat, Code2, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/icons";
import { profile } from "../data/profile";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  const hasEmail = Boolean(profile.links.email);

  return (
    <section id="contact" className="relative py-28 sm:py-36 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal direction="up">
          <div className="rounded-3xl border border-border bg-surface/60 px-6 py-14 sm:px-16 sm:py-20 text-center relative overflow-hidden">
            <motion.div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[520px] rounded-full bg-accent/15 blur-[120px]"
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <Reveal direction="down" delay={0.05}>
              <span className="relative text-xs uppercase tracking-[0.25em] text-accent font-medium">Contact</span>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <h2 className="relative font-display text-4xl sm:text-6xl mt-4 mb-6">Let's Build Together</h2>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="relative text-muted max-w-xl mx-auto mb-6">
                Have a role, a project, or an idea that needs someone who ships? I'm open to full-time and freelance
                opportunities.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.24}>
              <div className="relative flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-2 mb-10">
                {profile.links.phone && (
                  <a
                    href={`tel:${profile.links.phone.replace(/[^+\d]/g, "")}`}
                    className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                  >
                    <Phone size={14} />
                    {profile.links.phone}
                  </a>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} />
                  {profile.location}
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.28}>
              <div className="relative mb-10">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="relative text-xs uppercase tracking-[0.2em] text-muted-2 mb-5">or reach me directly</p>
              <div className="relative flex flex-wrap items-center justify-center gap-4">
                {hasEmail ? (
                  <a
                    href={`mailto:${profile.links.email}`}
                    aria-label={`Email ${profile.name} at ${profile.links.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:bg-accent-soft transition-colors"
                  >
                    <Mail size={16} />
                    Email Me
                  </a>
                ) : null}
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
                >
                  <LinkedinIcon size={16} />
                  LinkedIn
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
                >
                  <GithubIcon size={16} />
                  GitHub
                </a>
                {profile.links.leetcode && (
                  <a
                    href={profile.links.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
                  >
                    <Code2 size={16} />
                    LeetCode
                  </a>
                )}
                {profile.links.codechef && (
                  <a
                    href={profile.links.codechef}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
                  >
                    <ChefHat size={16} />
                    CodeChef
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
