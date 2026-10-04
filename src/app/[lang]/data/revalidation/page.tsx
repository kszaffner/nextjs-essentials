import { RevalidationTopic } from "@/modules/revalidation";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/data/revalidation">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/data/revalidation", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/data/revalidation">) {
  const locale = await readLocale(params);
  return <RevalidationTopic locale={locale} />;
}
