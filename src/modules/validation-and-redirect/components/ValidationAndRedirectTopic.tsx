import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ValidationAndRedirectTopic() {
  return (
    <TopicPage
      title="Validation and redirect"
      summary="Validating input, reporting errors, and redirecting after an action."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
