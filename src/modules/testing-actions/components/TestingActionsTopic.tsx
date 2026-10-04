import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function TestingActionsTopic() {
  return (
    <TopicPage
      title="Mocking and Server Actions"
      summary="Mocking fetch and cache, and testing Server Actions."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
