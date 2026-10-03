import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function RevalidationTopic() {
  return (
    <TopicPage
      title="Revalidation"
      summary="revalidatePath and revalidateTag."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
