import { RouteHandlersTopic } from "@/modules/route-handlers";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/advanced-routing/route-handlers">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/advanced-routing/route-handlers", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/advanced-routing/route-handlers">) {
  const locale = await readLocale(params);
  return <RouteHandlersTopic locale={locale} />;
}
