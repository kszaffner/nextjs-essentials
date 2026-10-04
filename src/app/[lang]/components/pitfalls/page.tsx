import { PitfallsTopic } from "@/modules/component-pitfalls";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/components/pitfalls">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/components/pitfalls", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/components/pitfalls">) {
  const locale = await readLocale(params);
  return <PitfallsTopic locale={locale} />;
}
