import { OgImagesTopic } from "@/modules/og-images";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/metadata/og-images">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/metadata/og-images", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/metadata/og-images">) {
  const locale = await readLocale(params);
  return <OgImagesTopic locale={locale} />;
}
