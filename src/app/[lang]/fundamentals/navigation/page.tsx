import { NavigationTopic } from "@/modules/navigation";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/fundamentals/navigation">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/fundamentals/navigation", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/fundamentals/navigation">) {
  const locale = await readLocale(params);
  return <NavigationTopic locale={locale} />;
}
