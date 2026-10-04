import { FontTopic } from "@/modules/font";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/optimization/font">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/optimization/font", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/optimization/font">) {
  const locale = await readLocale(params);
  return <FontTopic locale={locale} />;
}
