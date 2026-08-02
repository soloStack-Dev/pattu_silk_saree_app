"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export function LoadingCurtain() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    if (document.readyState === "complete") {
      run();
    } else {
      window.addEventListener("load", run);
      return () => window.removeEventListener("load", run);
    }
    function run() {
      const t = window.setTimeout(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
          gsap
            .timeline()
            .to(".curtain-panel--left", { yPercent: -101, duration: 1.1, ease: "power4.inOut" })
            .to(".curtain-panel--right", { yPercent: 101, duration: 1.1, ease: "power4.inOut" }, "<")
            .to(".curtain-logo", { autoAlpha: 0, duration: 0.4 }, "<")
            .set(el, { display: "none", pointerEvents: "none" });
        }, el);
        setDone(true);
        return () => ctx.revert();
      }, 250);
      return () => window.clearTimeout(t);
    }
  }, []);

  if (done) return null;

  return (
    <div ref={ref} className="loading-curtain" aria-hidden>
      <div className="curtain-panel curtain-panel--left">
        <span className="curtain-logo curtain-logo--gold">Kanchipuram</span>
      </div>
      <div className="curtain-panel curtain-panel--right">
        <span className="curtain-logo curtain-logo--ivory">Silks</span>
      </div>
    </div>
  );
}
