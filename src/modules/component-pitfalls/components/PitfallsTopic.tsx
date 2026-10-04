import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function PitfallsTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Pitfalls"
      summary="Server Component defaults and the mistakes they invite."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
