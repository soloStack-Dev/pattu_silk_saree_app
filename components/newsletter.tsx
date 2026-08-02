"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

type NewsletterProps = {
  title: string;
  body: string;
  bg?: "sand" | "fog";
};

export function Newsletter({ title, body, bg = "sand" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className={bg === "sand" ? "newsletter--sand" : "newsletter--fog"}>
      <Reveal y={30}>
        <div className="container-1280 newsletter__inner">
          <h2 className="newsletter__title">{title}</h2>
          <p className="newsletter__body">{body}</p>
          {done ? (
            <p className="newsletter__success">Thank you — welcome to the circle.</p>
          ) : (
            <form
              className="newsletter__form"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
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
