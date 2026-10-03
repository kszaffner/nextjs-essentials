import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/rendering/streaming");

export default function Page() {
  return <TopicPlaceholder href="/rendering/streaming" />;
}
