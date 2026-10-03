import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function StreamingTopic() {
  return (
    <TopicPage
      title="Streaming"
      summary="loading.tsx and Suspense boundaries in the Server Component tree."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
