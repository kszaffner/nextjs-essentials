import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ActionsAndHandlersTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Actions and handlers"
      summary="Error handling in Server Actions and Route Handlers."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
