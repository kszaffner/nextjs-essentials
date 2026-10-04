import { BundlersTopic } from "@/modules/bundlers";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/optimization/bundlers">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/optimization/bundlers", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/optimization/bundlers">) {
  const locale = await readLocale(params);
  return <BundlersTopic locale={locale} />;
}
