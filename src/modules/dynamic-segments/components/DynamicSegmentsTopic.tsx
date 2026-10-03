import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function DynamicSegmentsTopic() {
  return (
    <TopicPage
      title="Dynamic segments"
      summary="[slug], catch-all [...slug], and optional catch-all [[...slug]]."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
