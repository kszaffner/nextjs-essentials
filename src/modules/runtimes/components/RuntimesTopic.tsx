import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function RuntimesTopic() {
  return (
    <TopicPage
      title="Runtimes"
      summary="Edge Runtime vs Node.js runtime."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
