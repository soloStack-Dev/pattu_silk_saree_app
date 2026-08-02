"use client";

// Shared 0..1 scroll progress for the home 3D scene.
// The home page scrolls with the window (5 × 100vh sections); the Canvas
// reads this object every frame inside useFrame, so no React re-renders.

type ScrollState = {
  offset: number;
  delta: number;
};

export const homeScroll: ScrollState = { offset: 0, delta: 0 };

let lastOffset = 0;
let lastTime = 0;
let cleanup: (() => void) | null = null;

export function startScrollSync(): () => void {
  if (cleanup) return cleanup;

  const onScroll = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    const t = performance.now();
    const dt = Math.max(16, t - lastTime);
    homeScroll.delta = Math.min(1, (Math.abs(p - lastOffset) / (dt / 1000)) * 0.5);
    homeScroll.offset = p;
    lastOffset = p;
    lastTime = t;
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  cleanup = () => {
    window.removeEventListener("scroll", onScroll);
    cleanup = null;
  };
  return cleanup;
}
