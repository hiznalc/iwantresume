export function fitFontSize(text, width, measure, max = 27, min = 18) {
  if (!text || width <= 0) return max;
  const measured = measure(text, max);
  return measured > width ? Math.max(min, Math.min(max, max * width / measured)) : max;
}
