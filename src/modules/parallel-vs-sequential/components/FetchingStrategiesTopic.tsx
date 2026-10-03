import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function FetchingStrategiesTopic() {
  return (
    <TopicPage
      title="Parallel vs sequential fetching"
      summary="The waterfall problem and how to avoid it."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
