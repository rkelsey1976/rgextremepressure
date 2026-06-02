/**
 * Generate a srcset string for responsive images.
 * Given a base image path like "/images/hero-james-bath-property-4.webp",
 * returns a srcset string with 400w, 800w, 1200w, and 1600w variants.
 * Returns undefined if no responsive variants exist.
 */
export function srcset(imagePath: string): string | undefined {
  // Match our hero/interior image naming pattern
  const pattern = /^\/images\/(hero-james-bath-property-\d+|james-bath-interior-\d+)\.webp$/;
  const match = imagePath.match(pattern);
  if (!match) return undefined;
  
  const base = match[1];
  return [
    `/images/${base}-400w.webp 400w`,
    `/images/${base}-800w.webp 800w`,
    `/images/${base}-1200w.webp 1200w`,
    `/images/${base}.webp 1600w`,
  ].join(',\n    ');
}