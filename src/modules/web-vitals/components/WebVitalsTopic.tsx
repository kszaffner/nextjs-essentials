import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function WebVitalsTopic() {
  return (
    <TopicPage
      title="Web Vitals"
      summary="Bundle analysis and Core Web Vitals."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
