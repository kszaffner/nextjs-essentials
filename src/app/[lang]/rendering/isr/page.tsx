import { IsrTopic } from "@/modules/isr";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/rendering/isr">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/rendering/isr", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/rendering/isr">) {
  const locale = await readLocale(params);
  return <IsrTopic locale={locale} />;
}
