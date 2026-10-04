import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function DynamicImportTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="next/dynamic"
      summary="Code splitting and ssr: false."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
