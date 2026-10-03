// Values the demo routes pass to generateStaticParams. Kept here so the
// topic content and the routes agree on which params are prerendered.
export const prerenderedBlogSlugs = ["hello-nextjs", "dynamic-routes"] as const;

export const knownItemIds = ["1", "2"] as const;

export function isKnownItemId(id: string): boolean {
  return knownItemIds.some((knownId) => knownId === id);
}

export function isPrerenderedBlogSlug(slug: string): boolean {
  return prerenderedBlogSlugs.some((prerenderedSlug) => prerenderedSlug === slug);
}
