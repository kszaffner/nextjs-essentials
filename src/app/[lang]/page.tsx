import { TopicIndex } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  return <TopicIndex locale={await readLocale(params)} />;
}
