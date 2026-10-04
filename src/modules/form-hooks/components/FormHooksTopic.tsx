import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function FormHooksTopic() {
  return (
    <TopicPage
      title="Form hooks"
      summary="useActionState, useFormStatus, and useOptimistic."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
