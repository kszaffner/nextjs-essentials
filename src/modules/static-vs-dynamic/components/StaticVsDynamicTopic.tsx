import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function StaticVsDynamicTopic() {
  return (
    <TopicPage
      title="Static vs dynamic rendering"
      summary="When Next.js prerenders a route and when it renders per request."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
