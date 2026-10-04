import type { Locale } from "@/shared/i18n";
import { englishTopicTexts } from "./topicTexts.en";
import { polishTopicTexts } from "./topicTexts.pl";
import {
  topicGroups,
  type TopicGroupId,
  type TopicHref,
  type TopicText,
  type TopicTexts,
} from "./topicStructure";

export type Topic = TopicText & { href: TopicHref };

export type LocalizedTopicGroup = {
  id: TopicGroupId;
  title: string;
  topics: readonly Topic[];
};

const topicTexts: Record<Locale, TopicTexts> = {
  pl: polishTopicTexts,
  en: englishTopicTexts,
};

export function getTopicGroups(locale: Locale): readonly LocalizedTopicGroup[] {
  const texts = topicTexts[locale];
  return topicGroups.map((group) => ({
    id: group.id,
    title: texts.groups[group.id],
    topics: group.topics.map(({ href }) => ({ href, ...texts.topics[href] })),
  }));
}

export function getTopic(href: TopicHref, locale: Locale): Topic {
  return { href, ...topicTexts[locale].topics[href] };
}

export function getTopicMetadata(href: TopicHref, locale: Locale) {
  const { title, summary } = getTopic(href, locale);
  return { title, description: summary };
}

export function listTopicHrefs(): readonly TopicHref[] {
  return topicGroups.flatMap((group) => group.topics.map(({ href }) => href));
}

export { topicGroups, type TopicHref };
