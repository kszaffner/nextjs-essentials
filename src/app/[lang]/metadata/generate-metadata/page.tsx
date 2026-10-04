import { GenerateMetadataTopic } from "@/modules/generate-metadata";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/metadata/generate-metadata">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/metadata/generate-metadata", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/metadata/generate-metadata">) {
  const locale = await readLocale(params);
  return <GenerateMetadataTopic locale={locale} />;
}
