import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function IsrTopic() {
  return (
    <TopicPage
      title="Incremental Static Regeneration"
      summary="Time-based and on-demand revalidation of prerendered output."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
