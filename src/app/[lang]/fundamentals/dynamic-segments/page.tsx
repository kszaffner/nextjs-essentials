import { DynamicSegmentsTopic } from "@/modules/dynamic-segments";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/fundamentals/dynamic-segments">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/fundamentals/dynamic-segments", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/fundamentals/dynamic-segments">) {
  const locale = await readLocale(params);
  return <DynamicSegmentsTopic locale={locale} />;
}
