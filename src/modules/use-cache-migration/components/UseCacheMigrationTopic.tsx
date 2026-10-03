import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function UseCacheMigrationTopic() {
  return (
    <TopicPage
      title="Migrating to use cache"
      summary={'Moving from unstable_cache to "use cache".'}
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
