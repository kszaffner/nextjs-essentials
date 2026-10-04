import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function DynamicImportTopic() {
  return (
    <TopicPage
      title="next/dynamic"
      summary="Code splitting and ssr: false."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
