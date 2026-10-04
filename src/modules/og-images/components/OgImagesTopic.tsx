import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { basics, edgeCases, interviewQuestions } from "../content";

export function OgImagesTopic({ locale }: { locale: Locale }) {
  return (
    <TopicPage
      locale={locale}
      title="Open Graph images"
      summary="Generated images with opengraph-image.tsx."
      basics={basics}
      edgeCases={edgeCases}
      interviewQuestions={interviewQuestions}
    />
  );
}
