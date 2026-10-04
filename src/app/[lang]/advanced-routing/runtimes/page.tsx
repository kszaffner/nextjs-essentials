import { RuntimesTopic } from "@/modules/runtimes";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/advanced-routing/runtimes">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/advanced-routing/runtimes", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/advanced-routing/runtimes">) {
  const locale = await readLocale(params);
  return <RuntimesTopic locale={locale} />;
}
