/**
 * Smooth 0..1 fade for a scroll range [from, to] with a soft margin on both edges.
 */
export function fadeInOut(
  offset: number,
  from: number,
  to: number,
  margin = 0.03,
) {
  if (offset <= from || offset >= to) return 0;
  const start = from + margin;
  const end = to - margin;
  if (offset < start) return (offset - from) / margin;
  if (offset > end) return 1 - (offset - end) / margin;
  return 1;
}

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
