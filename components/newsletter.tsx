"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

/* ========================================================================== */
/* PROPS                                                                       */
/* ========================================================================== */

type NewsletterProps = {
  title: string;
  body: string;
  bg?: "sand" | "fog";
};

/* ========================================================================== */
/* COMPONENT — email capture banner                                            */
/* ========================================================================== */

/**
 * A simple subscribe form used on multiple pages.
 * Submitting with a non-empty email swaps the form for a thank-you message,
 * so the user gets immediate visual feedback (no backend is wired up yet).
 */
export function Newsletter({ title, body, bg = "sand" }: NewsletterProps) {
  // ---------- state ----------
  const [email, setEmail] = useState("");
  // true once the form has been submitted successfully.
  const [done, setDone] = useState(false);

  // ---------- helpers ----------

  /** Validate + confirm the submission, then hide the form. */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  // ---------- render ----------
  // Pick the colour scheme from the `bg` prop.
  const bgClass = bg === "sand" ? "newsletter--sand" : "newsletter--fog";

  return (
    <section className={bgClass}>
      <Reveal y={30}>
        <div className="container-1280 newsletter__inner">
          <h2 className="newsletter__title">{title}</h2>
          <p className="newsletter__body">{body}</p>

          {/* Once subscribed, show a thank-you instead of the form. */}
          {done ? (
            <p className="newsletter__success">
              Thank you — welcome to the circle.
            </p>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                className="newsletter__input"
              />
              <button type="submit" className="newsletter__submit">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
