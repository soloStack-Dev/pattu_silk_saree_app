"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ========================================================================== */
/* PROPS                                                                       */
/* ========================================================================== */

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

/* ========================================================================== */
/* COMPONENT — a reusable "fade/slide in on scroll" wrapper                    */
/* ========================================================================== */

/**
 * Wraps any content and animates it into view the first time it enters
 * the viewport. It is deliberately small and self-contained so pages can
 * use it without repeating GSAP setup.
 *
 * How it works:
 *  1. The element starts hidden (opacity 0, shifted by `y`, scaled down).
 *  2. A ScrollTrigger watches the element and, when it reaches the viewport
 *     (top crosses 85% of the window height), animates it back to normal.
 *  3. `once: true` means the animation only ever plays a single time.
 *  4. When `stagger` is set, each direct child animates in sequence.
 */
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

    // If stagger is requested, animate each direct child; else the element itself.
    const targets = stagger ? el.children : el;

    const ctx = gsap.context(() => {
      // Hide the target(s) first so nothing flashes on mount.
      gsap.set(targets, { autoAlpha: 0, y, scale });

      // Animate in once the element scrolls into view.
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

    // Clean up all animations + triggers created inside this context.
    return () => ctx.revert();
  }, [delay, y, scale, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
