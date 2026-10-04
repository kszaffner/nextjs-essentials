import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function WebVitalsTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Web Vitals"
      summary="Bundle analysis and Core Web Vitals."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
