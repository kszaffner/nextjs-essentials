import { PprTopic } from "@/modules/ppr";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/rendering/ppr">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/rendering/ppr", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/rendering/ppr">) {
  const locale = await readLocale(params);
  return <PprTopic locale={locale} />;
}
