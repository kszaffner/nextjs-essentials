import type { Locale } from "@/shared/i18n";
import type { TopicContent } from "@/shared/topic-page";
import { content as english } from "./en";
import { content as polish } from "./pl";

export const topicContent: Record<Locale, TopicContent> = {
  en: english,
  pl: polish,
};
