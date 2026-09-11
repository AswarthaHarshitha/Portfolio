import { ChefHat, Code2 } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import Reveal from "./Reveal";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal direction="up" duration={0.5}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div>
              <a href="#top" className="font-display text-lg tracking-wide">
                {profile.initials}
                <span className="text-accent">.</span>
              </a>
              <p className="text-sm text-muted mt-3 max-w-xs leading-relaxed">{profile.tagline}</p>
              <div className="flex items-center gap-3 mt-5">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-colors"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-colors"
                >
                  <LinkedinIcon size={16} />
                </a>
                {profile.links.leetcode && (
                  <a
                    href={profile.links.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LeetCode"
                    className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    <Code2 size={16} />
                  </a>
                )}
                {profile.links.codechef && (
                  <a
                    href={profile.links.codechef}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="CodeChef"
                    className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    <ChefHat size={16} />
                  </a>
                )}
              </div>
            </div>

            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm text-muted">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-foreground transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-2">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span>Built with React, Three.js &amp; Rapier physics.</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
