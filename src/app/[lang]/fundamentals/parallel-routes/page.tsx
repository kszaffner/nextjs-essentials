import { ParallelRoutesTopic } from "@/modules/parallel-routes";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/fundamentals/parallel-routes">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/fundamentals/parallel-routes", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/fundamentals/parallel-routes">) {
  const locale = await readLocale(params);
  return <ParallelRoutesTopic locale={locale} />;
}
