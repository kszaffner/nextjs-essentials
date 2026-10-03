import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function PitfallsTopic() {
  return (
    <TopicPage
      title="Pitfalls"
      summary="Server Component defaults and the mistakes they invite."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
