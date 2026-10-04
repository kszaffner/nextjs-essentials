import { StaticVsDynamicTopic } from "@/modules/static-vs-dynamic";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/rendering/static-vs-dynamic">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/rendering/static-vs-dynamic", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/rendering/static-vs-dynamic">) {
  const locale = await readLocale(params);
  return <StaticVsDynamicTopic locale={locale} />;
}
