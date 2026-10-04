import { ActionsAndHandlersTopic } from "@/modules/actions-and-handlers";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/errors/actions-and-handlers">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/errors/actions-and-handlers", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/errors/actions-and-handlers">) {
  const locale = await readLocale(params);
  return <ActionsAndHandlersTopic locale={locale} />;
}
