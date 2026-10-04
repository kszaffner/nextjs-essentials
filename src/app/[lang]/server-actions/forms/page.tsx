import { FormsTopic } from "@/modules/forms";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/server-actions/forms">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/server-actions/forms", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/server-actions/forms">) {
  const locale = await readLocale(params);
  return <FormsTopic locale={locale} />;
}
