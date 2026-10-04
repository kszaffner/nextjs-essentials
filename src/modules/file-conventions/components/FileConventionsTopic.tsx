import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function FileConventionsTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="File conventions"
      summary="page, layout, template, loading, error, not-found, route groups, and private folders."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
