// Deterministic editorial-style placeholder photography, keyed by a stable
// seed (the event slug) so the same event always gets the same image. Swap
// for real photography by setting a mainImage on the event in Wix.
export function placeholderImage(seed: string, width = 900, height = 1125): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
