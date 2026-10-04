import { CompositionTopic } from "@/modules/composition";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/components/composition">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/components/composition", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/components/composition">) {
  const locale = await readLocale(params);
  return <CompositionTopic locale={locale} />;
}
