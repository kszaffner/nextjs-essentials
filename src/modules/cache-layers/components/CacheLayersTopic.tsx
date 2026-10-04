import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function CacheLayersTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Cache layers"
      summary="Data Cache, Full Route Cache, Router Cache, and Request Memoization."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
