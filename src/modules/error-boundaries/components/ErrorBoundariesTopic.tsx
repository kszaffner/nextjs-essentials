import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ErrorBoundariesTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Error boundaries"
      summary="error.tsx vs global-error.tsx."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
