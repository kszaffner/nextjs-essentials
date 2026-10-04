import { NotFoundTopic } from "@/modules/not-found";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/errors/not-found">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/errors/not-found", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/errors/not-found">) {
  const locale = await readLocale(params);
  return <NotFoundTopic locale={locale} />;
}
