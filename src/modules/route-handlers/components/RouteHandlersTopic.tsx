import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function RouteHandlersTopic() {
  return (
    <TopicPage
      title="Route Handlers"
      summary="HTTP methods with NextRequest and NextResponse."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
