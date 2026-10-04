import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ImageTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="next/image"
      summary="Lazy loading, srcset, priority, and LCP."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
