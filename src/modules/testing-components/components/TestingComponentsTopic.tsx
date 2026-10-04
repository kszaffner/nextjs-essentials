import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function TestingComponentsTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Server vs Client Components"
      summary="Testing each kind of component."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
