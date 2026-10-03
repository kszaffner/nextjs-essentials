import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function InterceptingRoutesTopic() {
  return (
    <TopicPage
      title="Intercepting routes"
      summary="Showing another route in the current context with (.)folder."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
