import { ImageTopic } from "@/modules/image";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/optimization/image">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/optimization/image", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/optimization/image">) {
  const locale = await readLocale(params);
  return <ImageTopic locale={locale} />;
}
