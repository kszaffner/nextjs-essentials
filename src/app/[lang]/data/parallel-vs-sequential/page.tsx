import { FetchingStrategiesTopic } from "@/modules/parallel-vs-sequential";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/data/parallel-vs-sequential">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/data/parallel-vs-sequential", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/data/parallel-vs-sequential">) {
  const locale = await readLocale(params);
  return <FetchingStrategiesTopic locale={locale} />;
}
