import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function ProxyTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Proxy"
      summary="Rewrites, redirects, and personalization in proxy.ts."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
