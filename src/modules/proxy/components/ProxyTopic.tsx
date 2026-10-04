import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ProxyTopic() {
  return (
    <TopicPage
      title="Proxy"
      summary="Rewrites, redirects, and personalization in proxy.ts."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
