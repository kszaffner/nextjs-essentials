import { ProxyTopic } from "@/modules/proxy";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/advanced-routing/proxy">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/advanced-routing/proxy", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/advanced-routing/proxy">) {
  const locale = await readLocale(params);
  return <ProxyTopic locale={locale} />;
}
