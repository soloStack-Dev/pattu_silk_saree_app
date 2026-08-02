"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** delay in seconds */
  delay?: number;
  /** y offset in px */
  y?: number;
  /** scale transform start */
  scale?: number;
  /** stagger children */
  stagger?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  scale = 1,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? el.children : el;
    const ctx = gsap.context(() => {
      gsap.set(targets, { autoAlpha: 0, y, scale });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, scale, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
