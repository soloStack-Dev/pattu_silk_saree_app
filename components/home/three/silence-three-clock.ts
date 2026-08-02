"use client";

// three r183+ deprecates THREE.Clock (in favour of THREE.Timer), but
// @react-three/fiber still instantiates a THREE.Clock internally for its
// frame clock. three emits the deprecation via console.warn (through its
// internal `warn()` helper), so we filter that single message so it never
// reaches the console. Import this module BEFORE the Canvas mounts.
if (
  typeof window !== "undefined" &&
  typeof console !== "undefined" &&
  typeof console.warn === "function"
) {
  const originalWarn = console.warn.bind(console);
  const IGNORED = [
    "Clock: This module has been deprecated.",
    "THREE.Clock: This module has been deprecated.",
    "Please use THREE.Timer instead.",
  ];
  console.warn = (...args: unknown[]) => {
    const first = args[0];
    if (
      typeof first === "string" &&
      IGNORED.some((needle) => first.startsWith(needle))
    ) {
      return;
    }
    originalWarn(...(args as Parameters<typeof console.warn>));
  };
}
