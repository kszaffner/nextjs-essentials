import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function GenerateMetadataTopic() {
  return (
    <TopicPage
      title="generateMetadata"
      summary="Static and dynamic metadata, and metadataBase."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
