import type { Metadata } from "next";
import { defaultLocale, locales, localizePath, type Locale } from "@/shared/i18n";
import { getTopicMetadata } from "./topics";
import type { TopicHref } from "./topicStructure";

// Title and description in the request's language, plus the canonical URL and
// the other-language alternates, so search engines pair the translations.
export function generateTopicMetadata(href: TopicHref, locale: Locale): Metadata {
  return {
    ...getTopicMetadata(href, locale),
    alternates: {
      canonical: localizePath(locale, href),
      languages: {
        ...Object.fromEntries(locales.map((alternate) => [alternate, localizePath(alternate, href)])),
        "x-default": localizePath(defaultLocale, href),
      },
    },
  };
}
