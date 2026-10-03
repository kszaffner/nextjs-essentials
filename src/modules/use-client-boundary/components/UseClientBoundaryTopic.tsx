import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function UseClientBoundaryTopic() {
  return (
    <TopicPage
      title="The use client boundary"
      summary="What can and cannot cross the boundary as props."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
