/**
 * Generate a srcset string for responsive images.
 * Returns undefined if the image path doesn't match known patterns
 * or if the path is empty/undefined.
 */
export function srcset(imagePath: string | undefined): string | undefined {
  if (!imagePath) return undefined;
  // For now, return undefined — responsive variants will be added
  // when real images are supplied. This prevents build crashes.
  return undefined;
}