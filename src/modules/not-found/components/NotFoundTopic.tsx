import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function NotFoundTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Not found"
      summary="not-found.tsx and notFound()."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
