import { CacheLayersTopic } from "@/modules/cache-layers";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/data/cache-layers">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/data/cache-layers", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/data/cache-layers">) {
  const locale = await readLocale(params);
  return <CacheLayersTopic locale={locale} />;
}
