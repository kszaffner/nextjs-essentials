import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function PprTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Partial Prerendering"
      summary={'"use cache", cacheLife, and cacheTag with a static shell.'}
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
