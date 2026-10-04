import { UseClientBoundaryTopic } from "@/modules/use-client-boundary";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/components/use-client-boundary">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/components/use-client-boundary", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/components/use-client-boundary">) {
  const locale = await readLocale(params);
  return <UseClientBoundaryTopic locale={locale} />;
}
