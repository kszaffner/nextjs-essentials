import { ValidationAndRedirectTopic } from "@/modules/validation-and-redirect";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/server-actions/validation-and-redirect">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/server-actions/validation-and-redirect", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/server-actions/validation-and-redirect">) {
  const locale = await readLocale(params);
  return <ValidationAndRedirectTopic locale={locale} />;
}
