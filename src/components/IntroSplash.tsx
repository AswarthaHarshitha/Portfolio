import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Globe, Mail, User } from "lucide-react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { publications } from "../data/publications";
import { certifications } from "../data/certifications";
import { useScramble } from "../lib/useScramble";
import { withBase } from "../lib/utils";

const TYPE_INTERVAL_MS = 55;
const PORTFOLIO_WORD = "PORTFOLIO";

type Step = "intro" | "portfolio" | "name" | "email" | "speaking" | "done";

const STEP_PROGRESS: Record<Step, number> = {
  intro: 10,
  portfolio: 30,
  name: 55,
  email: 72,
  speaking: 92,
  done: 100,
};

// NOTE: drop a real Bitmoji export at public/bitmoji.png and this component
// will use it automatically in place of the drawn placeholder below.
const BITMOJI_SRC = withBase("bitmoji.png");

// Browsers never expose a voice's actual gender/age — only a name and a lang
// code — so "strictly female, ~22" is approximated by name-matching against
// known female voices first, and otherwise explicitly ruling out known male
// ones, combined with a higher pitch/rate below for a younger-sounding read.
const FEMALE_VOICE_PATTERN =
  /female|woman|girl|zira|heera|veena|priya|neerja|raveena|lekha|kalpana|aria|samantha|victoria|kavya|ananya|moira|tessa|karen|susan|fiona|serena|salli|joanna|kendra|kimberly|ivy/i;
const MALE_VOICE_PATTERN =
  /male|david|mark|daniel|alex(?!a)|fred|james|guy|thomas|ravi|rishi|george|arthur|matthew|justin|joey|oliver|aaron|nathan|gordon|tom\b|reed|eddy|rocko/i;

/** Strictly female voice selection: searches every installed voice, in every
 * language, for an explicitly female-named one before ever settling for an
 * ambiguous/unlabeled voice — so a female voice available under a different
 * language pool still wins over a same-language voice of unknown gender.
 * Only when the device genuinely has zero female-labeled voices installed
 * does this fall back to a best-effort "at least not explicitly male" pick. */
function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return undefined;
  const byLang = (prefix: string) => voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  const langPools = [byLang("en-in"), byLang("hi-in"), byLang("en-gb"), byLang("en-us"), byLang("en")];

  // Pass 1 — an explicitly female-named voice, in any language, preferring
  // the closest-matching language first but never skipping a female voice
  // just because an unlabeled one showed up in a higher-priority pool.
  for (const pool of [...langPools, voices]) {
    const female = pool.find((v) => FEMALE_VOICE_PATTERN.test(v.name));
    if (female) return female;
  }

  // Pass 2 — genuinely no female-labeled voice exists on this device at all.
  for (const pool of langPools) {
    if (pool.length === 0) continue;
    const notMale = pool.find((v) => !MALE_VOICE_PATTERN.test(v.name));
    if (notMale) return notMale;
  }
  return voices.find((v) => !MALE_VOICE_PATTERN.test(v.name)) ?? voices[0];
}

export default function IntroSplash({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState<Step>("intro");
  const [emailChars, setEmailChars] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [hasAvatarImage, setHasAvatarImage] = useState(true);
  const [exiting, setExiting] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const email = profile.links.email;
  // ~180 words — around a minute at the utterance's speaking rate. Opens with
  // "Welcome to my portfolio" per spec, then pitches like a recruiter would
  // want to hear it: concrete skills, shipped work, real metrics, and a CTA.
  // Every fact here is real, pulled straight from the same data the rest of
  // the site uses — nothing invented for the sake of the pitch.
  const summary = [
    `Welcome to my portfolio. I'm ${profile.name}, a ${profile.title}.`,
    `I ship production-style software end to end: AI agents that call real tools and APIs, full-stack applications with React, TypeScript, and Node.js, enterprise systems with role-based access control, and data platforms that turn raw numbers into decisions.`,
    `Recent work includes a HIPAA-minded clinical documentation tool, a Gemini-powered Google Workspace assistant, an SAP Fiori work-order management system, and a hundred and eight thousand row enterprise analytics pipeline — all built with a focus on real correctness over demo polish: honest data, real authentication, and no fabricated output.`,
    `I've shipped over ${projects.length} projects across full-stack engineering, generative AI, computer vision, data analytics, and SAP enterprise applications. I've published ${publications.length} piece${publications.length === 1 ? "" : "s"} of research with IEEE on applying machine learning to personalized health, and I hold ${certifications.length} certifications from SAP, Amazon Web Services, Oracle, and NPTEL, IIT Madras.`,
    `I'm based in ${profile.location} and available for freelance and full-time roles. Take a look through my projects, publications, and certifications below, or reach out directly — I'd love to talk.`,
  ].join(" ");

  const portfolioScramble = useScramble(PORTFOLIO_WORD, step === "portfolio" && !reduced);
  const nameScramble = useScramble(profile.name.toUpperCase(), step === "name" && !reduced, { stepMs: 40 });

  // intro -> portfolio
  useEffect(() => {
    if (step !== "intro") return;
    const t = setTimeout(() => setStep("portfolio"), reduced ? 200 : 900);
    return () => clearTimeout(t);
  }, [step, reduced]);

  // portfolio word scrambles in, then hand off to the name
  useEffect(() => {
    if (step !== "portfolio") return;
    if (reduced) {
      const t = setTimeout(() => setStep("name"), 250);
      return () => clearTimeout(t);
    }
    if (portfolioScramble.done) {
      const t = setTimeout(() => setStep("name"), 400);
      return () => clearTimeout(t);
    }
  }, [step, portfolioScramble.done, reduced]);

  // name scrambles in, then move to the email
  useEffect(() => {
    if (step !== "name") return;
    if (reduced) {
      const t = setTimeout(() => setStep("email"), 250);
      return () => clearTimeout(t);
    }
    if (nameScramble.done) {
      const t = setTimeout(() => setStep("email"), 450);
      return () => clearTimeout(t);
    }
  }, [step, nameScramble.done, reduced]);

  // email types out
  useEffect(() => {
    if (step !== "email") return;
    if (!email) {
      setStep("speaking");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setEmailChars(i);
      if (i >= email.length) {
        clearInterval(id);
        setTimeout(() => setStep("speaking"), 500);
      }
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [step, email]);

  // the Bitmoji "speaks" the summary aloud via the browser's built-in speech
  // synthesis, using the most natural-sounding voice available on this device.
  useEffect(() => {
    if (step !== "speaking") return;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    let spoken = false;

    const finish = () => {
      if (fallback) clearTimeout(fallback);
      setSpeaking(false);
      setStep("done");
    };

    if (!("speechSynthesis" in window)) {
      fallback = setTimeout(finish, 3400);
      return () => {
        if (fallback) clearTimeout(fallback);
      };
    }

    // Chrome silently stops long utterances (~15s+) unless nudged — a periodic
    // pause/resume keeps it alive for the full ~1-minute narration.
    let keepAlive: ReturnType<typeof setInterval> | undefined;

    const speakNow = () => {
      if (cancelled || spoken) return;
      spoken = true;
      const utter = new SpeechSynthesisUtterance(summary);
      const voice = pickVoice();
      if (voice) utter.voice = voice;
      utter.lang = voice?.lang ?? "en-IN";
      // Nudged up for a younger, more feminine read — browsers don't expose
      // an actual age/gender control, so pitch/rate is the only lever here.
      utter.pitch = 1.25;
      utter.rate = 1.0;
      utter.onstart = () => setSpeaking(true);
      utter.onend = finish;
      utter.onerror = finish;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);

      keepAlive = setInterval(() => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 12000);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speakNow;
      setTimeout(speakNow, 300); // some browsers never fire voiceschanged
    } else {
      speakNow();
    }

    // Safety net well past the ~70s narration, in case onend never fires.
    fallback = setTimeout(finish, 95000);
    return () => {
      cancelled = true;
      if (fallback) clearTimeout(fallback);
      if (keepAlive) clearInterval(keepAlive);
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [step, summary]);

  // hold briefly, then fade the whole overlay out
  useEffect(() => {
    if (step !== "done") return;
    const t = setTimeout(() => setExiting(true), 500);
    return () => clearTimeout(t);
  }, [step]);

  const skip = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setEmailChars(email.length);
    setSpeaking(false);
    setExiting(true);
  };

  const showEmail = step === "email" || step === "speaking" || step === "done";
  const showAvatar = step === "speaking" || step === "done";

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!exiting && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col bg-background overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[560px] w-[860px] rounded-full bg-accent/20 blur-[140px]" />
          </div>

          <button
            onClick={skip}
            className="absolute top-6 right-5 sm:top-8 sm:right-8 text-xs uppercase tracking-[0.2em] text-muted-2 hover:text-accent transition-colors"
          >
            Skip →
          </button>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              {[Code2, User, Globe].map((Icon, i) => (
                <span
                  key={i}
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-border-strong text-muted"
                >
                  <Icon size={16} />
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: step !== "intro" ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted mb-3"
            >
              Welcome to my
            </motion.p>

            <div className="font-display text-[11vw] sm:text-5xl lg:text-6xl uppercase text-muted-2 tracking-wide mb-4 min-h-[1.1em]">
              {step === "intro" ? "" : portfolioScramble.display}
            </div>

            <h1 className="font-display text-[13vw] sm:text-6xl lg:text-7xl uppercase text-gradient-accent leading-[0.95] min-h-[1.1em]">
              {step === "intro" || step === "portfolio" ? "" : nameScramble.display}
            </h1>

            <AnimatePresence>
              {showEmail && (
                <motion.a
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pointer-events-auto inline-flex items-center gap-2 font-mono text-sm sm:text-base text-muted hover:text-accent transition-colors mt-6 min-h-[1.5em]"
                >
                  <Mail size={15} />
                  {email.slice(0, emailChars)}
                  {emailChars < email.length && <span className="animate-pulse">|</span>}
                </motion.a>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showAvatar && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-5 mt-10"
                >
                  <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0">
                    {/* highlight halo */}
                    <motion.div
                      aria-hidden="true"
                      className="absolute -inset-3 rounded-full bg-accent/25 blur-xl"
                      animate={speaking ? { opacity: [0.4, 0.9, 0.4], scale: [0.96, 1.06, 0.96] } : { opacity: 0.5, scale: 1 }}
                      transition={{ duration: 1.4, repeat: speaking ? Infinity : 0, ease: "easeInOut" }}
                    />
                    {/* spinning gradient ring */}
                    <motion.div
                      aria-hidden="true"
                      className="absolute -inset-1.5 rounded-full"
                      style={{
                        background: "conic-gradient(from 0deg, var(--color-accent), transparent 40%, var(--color-accent))",
                      }}
                      animate={speaking ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 3, repeat: speaking ? Infinity : 0, ease: "linear" }}
                    />
                    <motion.div
                      animate={speaking ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 0.9, repeat: speaking ? Infinity : 0, ease: "easeInOut" }}
                      className="relative h-full w-full rounded-full border-2 border-background bg-surface overflow-hidden"
                    >
                      {hasAvatarImage ? (
                        <img
                          src={BITMOJI_SRC}
                          alt="Bitmoji avatar"
                          onError={() => setHasAvatarImage(false)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <BitmojiPlaceholder speaking={speaking} />
                      )}
                    </motion.div>
                  </div>

                  <div className="relative rounded-2xl rounded-bl-none border border-border-strong bg-surface px-4 py-3 max-w-xs text-left">
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      Hi, I'm {profile.name.split(" ")[0]} — {profile.title}.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* loading progress */}
          <div className="px-6 sm:px-10 pb-8">
            <div className="mx-auto max-w-xs h-px bg-border-strong overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-accent"
                animate={{ width: `${STEP_PROGRESS[step]}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Simple drawn avatar with a talking-mouth animation, used until a real Bitmoji export is added. */
function BitmojiPlaceholder({ speaking }: { speaking: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="var(--color-accent-dim)" />
      <circle cx="50" cy="46" r="26" fill="var(--color-accent-soft)" />
      <circle cx="41" cy="42" r="3.2" fill="#0a0a0a" />
      <circle cx="61" cy="42" r="3.2" fill="#0a0a0a" />
      <motion.ellipse
        cx="51"
        cy="58"
        rx="9"
        ry={speaking ? 5 : 2}
        fill="#0a0a0a"
        animate={speaking ? { ry: [2, 6, 2] } : { ry: 2 }}
        transition={{ duration: 0.35, repeat: speaking ? Infinity : 0, ease: "easeInOut" }}
      />
    </svg>
  );
}
