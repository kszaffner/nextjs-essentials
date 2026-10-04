import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ServerActionsBasicsTopic() {
  return (
    <TopicPage
      title="Server Actions basics"
      summary={'"use server" and calling actions from Client and Server Components.'}
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
