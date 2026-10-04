import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function TestingActionsTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Mocking and Server Actions"
      summary="Mocking fetch and cache, and testing Server Actions."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
