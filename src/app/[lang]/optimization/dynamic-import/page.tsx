import { DynamicImportTopic } from "@/modules/dynamic-import";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/optimization/dynamic-import">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/optimization/dynamic-import", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/optimization/dynamic-import">) {
  const locale = await readLocale(params);
  return <DynamicImportTopic locale={locale} />;
}
