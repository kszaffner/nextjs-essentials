import { TestingComponentsTopic } from "@/modules/testing-components";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/testing/server-vs-client">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/testing/server-vs-client", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/testing/server-vs-client">) {
  const locale = await readLocale(params);
  return <TestingComponentsTopic locale={locale} />;
}
