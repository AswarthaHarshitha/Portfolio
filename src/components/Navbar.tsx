import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import { cx } from "../lib/utils";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // offset accounts for the fixed navbar height plus a little breathing room
      const y = window.scrollY + 140;
      let current = "";
      for (const el of sections) {
        if (el.offsetTop <= y) current = el.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <motion.a
          href="#top"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="font-display text-lg tracking-wide"
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </motion.a>

        <ul className="hidden lg:flex items-center gap-6 text-sm text-muted">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cx(
                  "relative py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100",
                  active === l.href.slice(1) ? "text-foreground after:scale-x-100" : "after:scale-x-0"
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center rounded-full border border-border-strong px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
        >
          Let's Talk
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative h-6 w-6 text-foreground"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <ul className="flex flex-col px-5 py-4 gap-4 text-sm">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "hover:text-foreground transition-colors",
                      active === l.href.slice(1) ? "text-accent" : "text-muted"
                    )}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
