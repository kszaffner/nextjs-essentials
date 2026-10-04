import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function OgImagesTopic() {
  return (
    <TopicPage
      title="Open Graph images"
      summary="Generated images with opengraph-image.tsx."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
