import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function FetchExtensionsTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="fetch() extensions"
      summary="cache, next.revalidate, and next.tags."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
