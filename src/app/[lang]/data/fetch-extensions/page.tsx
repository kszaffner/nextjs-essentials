import { FetchExtensionsTopic } from "@/modules/fetch-extensions";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/data/fetch-extensions">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/data/fetch-extensions", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/data/fetch-extensions">) {
  const locale = await readLocale(params);
  return <FetchExtensionsTopic locale={locale} />;
}
