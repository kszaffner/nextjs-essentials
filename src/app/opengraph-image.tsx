import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderOgImage } from "@/modules/og-images";

// The default share image for every page that does not define its own.
export const alt = "nextjs-essentials: an interview-ready compendium of the Next.js App Router";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderOgImage("nextjs-essentials", "An interview-ready compendium of the Next.js App Router");
}
