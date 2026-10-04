import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderOgImage } from "@/modules/og-images";
import { messages, readLocale } from "@/shared/i18n";

// The default share image for every page that does not define its own.
export const alt = "nextjs-essentials: an interview-ready compendium of the Next.js App Router";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await readLocale(params);
  return renderOgImage("nextjs-essentials", messages[locale].siteDescription);
}
