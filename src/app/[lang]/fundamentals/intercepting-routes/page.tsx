import { InterceptingRoutesTopic } from "@/modules/intercepting-routes";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/fundamentals/intercepting-routes">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/fundamentals/intercepting-routes", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/fundamentals/intercepting-routes">) {
  const locale = await readLocale(params);
  return <InterceptingRoutesTopic locale={locale} />;
}
