import type { Locale } from "@/shared/i18n";
import { TopicPage } from "@/shared/topic-page";
import { topicContent } from "../content";

export function TestingComponentsTopic({ locale }: { locale: Locale }) {
  return <TopicPage locale={locale} {...topicContent[locale]} />;
}
