import { UseCacheMigrationTopic } from "@/modules/use-cache-migration";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/data/use-cache-migration">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/data/use-cache-migration", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/data/use-cache-migration">) {
  const locale = await readLocale(params);
  return <UseCacheMigrationTopic locale={locale} />;
}
