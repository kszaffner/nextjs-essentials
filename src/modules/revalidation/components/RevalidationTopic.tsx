import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function RevalidationTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Revalidation"
      summary="revalidatePath and revalidateTag."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
