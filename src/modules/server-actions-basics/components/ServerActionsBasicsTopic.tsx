import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ServerActionsBasicsTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Server Actions basics"
      summary={'"use server" and calling actions from Client and Server Components.'}
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
