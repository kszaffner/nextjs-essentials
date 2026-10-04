import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function TestingComponentsTopic() {
  return (
    <TopicPage
      title="Server vs Client Components"
      summary="Testing each kind of component."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
