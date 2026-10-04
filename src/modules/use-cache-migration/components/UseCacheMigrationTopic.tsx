import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function UseCacheMigrationTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Migrating to use cache"
      summary={'Moving from unstable_cache to "use cache".'}
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
