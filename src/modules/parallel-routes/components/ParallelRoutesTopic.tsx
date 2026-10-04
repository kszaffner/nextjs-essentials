import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ParallelRoutesTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Parallel routes"
      summary="Rendering several pages in one layout with @slot folders."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
