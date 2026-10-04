import { ServerActionsBasicsTopic } from "@/modules/server-actions-basics";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/server-actions/basics">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/server-actions/basics", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/server-actions/basics">) {
  const locale = await readLocale(params);
  return <ServerActionsBasicsTopic locale={locale} />;
}
