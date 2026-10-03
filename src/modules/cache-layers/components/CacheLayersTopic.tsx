import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function CacheLayersTopic() {
  return (
    <TopicPage
      title="Cache layers"
      summary="Data Cache, Full Route Cache, Router Cache, and Request Memoization."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
