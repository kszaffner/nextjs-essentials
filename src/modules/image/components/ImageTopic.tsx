import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ImageTopic() {
  return (
    <TopicPage
      title="next/image"
      summary="Lazy loading, srcset, priority, and LCP."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
