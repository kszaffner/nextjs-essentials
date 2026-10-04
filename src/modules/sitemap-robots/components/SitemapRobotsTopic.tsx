import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function SitemapRobotsTopic() {
  return (
    <TopicPage
      title="Sitemap and robots"
      summary="sitemap.ts and robots.ts."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
