import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function NavigationTopic() {
  return (
    <TopicPage
      title="Navigation"
      summary="Link, useRouter, usePathname, useSearchParams, and prefetching."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
