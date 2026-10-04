import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ErrorBoundariesTopic() {
  return (
    <TopicPage
      title="Error boundaries"
      summary="error.tsx vs global-error.tsx."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
