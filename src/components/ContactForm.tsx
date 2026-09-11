import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { profile } from "../data/profile";

// FormSubmit (https://formsubmit.co) — free, and unlike Formspree it needs no
// signup or dashboard: it POSTs straight to your real inbox address below.
// The only one-time step is on YOUR side: the very first message ever sent
// through this form triggers a "confirm your FormSubmit activation" email to
// that address — click it once and every submission after that (from any
// visitor) delivers normally, no further action needed.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.links.email}`;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      _subject: `Portfolio message from ${data.get("name")}`,
      _captcha: "false",
      _template: "table",
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const body: { success?: string; message?: string } | null = await res.json().catch(() => null);

      if (res.ok && body?.success === "true") {
        setStatus("success");
        form.reset();
      } else if (body?.message && /activation/i.test(body.message)) {
        // First-ever submission to this address — FormSubmit just emailed an
        // "Activate Form" link to it instead of delivering this message.
        setErrorMessage(
          `This form needs a one-time activation — check ${profile.links.email} for an "Activate Form" email, click it, then try again.`
        );
        setStatus("error");
      } else {
        setErrorMessage(body?.message ?? "Something went wrong sending that — try the email link below instead.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Couldn't reach the mail service — try the email link below instead.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 py-10 text-center"
        role="status"
      >
        <CheckCircle2 className="text-accent" size={32} />
        <p className="font-semibold">Message sent — thanks for reaching out.</p>
        <p className="text-sm text-muted">I'll get back to you as soon as I can.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-accent hover:text-accent-soft transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto text-left" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-2 mb-1.5">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-border-strong bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-2 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-2 mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-border-strong bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-2 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted-2 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={4}
          className="w-full rounded-xl border border-border-strong bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-2 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none"
          placeholder="What's the role, project, or idea?"
        />
      </div>

      {status === "error" && (
        <div role="alert" className="mt-4 flex items-start gap-2 text-sm text-left text-red-400">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:bg-accent-soft transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
