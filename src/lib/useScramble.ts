import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

/**
 * Classic "decoder" text effect: characters randomize, then lock into the
 * target string one at a time, left to right. Spaces are left untouched.
 */
export function useScramble(
  target: string,
  active: boolean,
  { scrambleMs = 35, stepMs = 45 }: { scrambleMs?: number; stepMs?: number } = {}
) {
  const [display, setDisplay] = useState(active ? target : target);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setDone(false);
    let revealed = 0;

    const scrambleId = setInterval(() => {
      setDisplay(
        target
          .split("")
          .map((ch, i) => (ch === " " ? " " : i < revealed ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
    }, scrambleMs);

    const stepId = setInterval(() => {
      revealed++;
      if (revealed >= target.length) {
        clearInterval(stepId);
        clearInterval(scrambleId);
        setDisplay(target);
        setDone(true);
      }
    }, stepMs);

    return () => {
      clearInterval(scrambleId);
      clearInterval(stepId);
    };
  }, [active, target, scrambleMs, stepMs]);

  return { display, done };
}
