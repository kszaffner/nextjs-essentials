import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function InterceptingRoutesTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Intercepting routes"
      summary="Showing another route in the current context with (.)folder."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
