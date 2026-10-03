import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/navigation");

export default function Page() {
  return <TopicPlaceholder href="/fundamentals/navigation" />;
}
