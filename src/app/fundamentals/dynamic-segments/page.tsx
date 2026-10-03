import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/dynamic-segments");

export default function Page() {
  return <TopicPlaceholder href="/fundamentals/dynamic-segments" />;
}
