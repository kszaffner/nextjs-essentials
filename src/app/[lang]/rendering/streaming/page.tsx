import { StreamingTopic } from "@/modules/streaming";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/rendering/streaming">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/rendering/streaming", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/rendering/streaming">) {
  const locale = await readLocale(params);
  return <StreamingTopic locale={locale} />;
}
