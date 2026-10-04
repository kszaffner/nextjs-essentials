import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function FontTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="next/font"
      summary="Self-hosting fonts and avoiding layout shift."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
