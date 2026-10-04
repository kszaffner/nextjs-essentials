import { TestingActionsTopic } from "@/modules/testing-actions";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/testing/mocking-and-actions">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/testing/mocking-and-actions", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/testing/mocking-and-actions">) {
  const locale = await readLocale(params);
  return <TestingActionsTopic locale={locale} />;
}
