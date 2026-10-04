import { FileConventionsTopic } from "@/modules/file-conventions";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/fundamentals/file-conventions">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/fundamentals/file-conventions", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/fundamentals/file-conventions">) {
  const locale = await readLocale(params);
  return <FileConventionsTopic locale={locale} />;
}
