import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function CompositionTopic() {
  return (
    <TopicPage
      title="Composition"
      summary="Passing Client Components as children to Server Components."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
