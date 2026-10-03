import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/rendering/isr");

export default function Page() {
  return <TopicPlaceholder href="/rendering/isr" />;
}
