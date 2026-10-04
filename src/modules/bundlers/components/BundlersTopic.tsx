import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function BundlersTopic() {
  return (
    <TopicPage
      title="Turbopack vs Webpack"
      summary="The mental model and when to use each."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
