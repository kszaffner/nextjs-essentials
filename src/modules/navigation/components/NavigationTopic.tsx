import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function NavigationTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Navigation"
      summary="Link, useRouter, usePathname, useSearchParams, and prefetching."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
