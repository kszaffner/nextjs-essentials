import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ValidationAndRedirectTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Validation and redirect"
      summary="Validating input, reporting errors, and redirecting after an action."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
