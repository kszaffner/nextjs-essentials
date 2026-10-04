import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function NotFoundTopic() {
  return (
    <TopicPage
      title="Not found"
      summary="not-found.tsx and notFound()."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
