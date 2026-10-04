import { notFound } from "next/navigation";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  findOgDemoItem,
  ogDemoItems,
  renderOgImage,
} from "@/modules/og-images";

export const alt = "Open Graph image for an item of the demo";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export function generateStaticParams() {
  return ogDemoItems.map((item) => ({ slug: item.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findOgDemoItem(slug);

  if (!item) {
    notFound();
  }

  return renderOgImage(item.title, "Generated for this page by opengraph-image.tsx");
}
