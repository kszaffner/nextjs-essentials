import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/components/pitfalls");

export default function Page() {
  return <TopicPlaceholder href="/components/pitfalls" />;
}
