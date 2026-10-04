export type OgDemoItem = {
  slug: string;
  title: string;
};

export const ogDemoItems: readonly OgDemoItem[] = [
  { slug: "alpha", title: "Alpha" },
  { slug: "beta", title: "Beta" },
];

export function findOgDemoItem(slug: string): OgDemoItem | undefined {
  return ogDemoItems.find((item) => item.slug === slug);
}
