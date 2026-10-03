import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ParallelRoutesTopic() {
  return (
    <TopicPage
      title="Parallel routes"
      summary="Rendering several pages in one layout with @slot folders."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
