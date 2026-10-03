import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function FetchExtensionsTopic() {
  return (
    <TopicPage
      title="fetch() extensions"
      summary="cache, next.revalidate, and next.tags."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
