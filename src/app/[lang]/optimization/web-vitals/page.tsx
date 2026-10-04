import { WebVitalsTopic } from "@/modules/web-vitals";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/optimization/web-vitals">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/optimization/web-vitals", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/optimization/web-vitals">) {
  const locale = await readLocale(params);
  return <WebVitalsTopic locale={locale} />;
}
