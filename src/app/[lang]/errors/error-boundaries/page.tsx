import { ErrorBoundariesTopic } from "@/modules/error-boundaries";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/errors/error-boundaries">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/errors/error-boundaries", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/errors/error-boundaries">) {
  const locale = await readLocale(params);
  return <ErrorBoundariesTopic locale={locale} />;
}
