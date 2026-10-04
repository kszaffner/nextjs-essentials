export const knownSlugs = ["alpha", "beta"] as const;

export function isKnownSlug(slug: string): boolean {
  return knownSlugs.some((knownSlug) => knownSlug === slug);
}
