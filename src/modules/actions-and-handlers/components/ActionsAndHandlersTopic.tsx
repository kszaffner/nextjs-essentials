import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ActionsAndHandlersTopic() {
  return (
    <TopicPage
      title="Actions and handlers"
      summary="Error handling in Server Actions and Route Handlers."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
