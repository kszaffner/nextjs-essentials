import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function FontTopic() {
  return (
    <TopicPage
      title="next/font"
      summary="Self-hosting fonts and avoiding layout shift."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
