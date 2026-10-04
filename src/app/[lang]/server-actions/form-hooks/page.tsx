import { FormHooksTopic } from "@/modules/form-hooks";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/server-actions/form-hooks">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/server-actions/form-hooks", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/server-actions/form-hooks">) {
  const locale = await readLocale(params);
  return <FormHooksTopic locale={locale} />;
}
