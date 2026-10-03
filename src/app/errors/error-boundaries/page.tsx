import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/errors/error-boundaries");

export default function Page() {
  return <TopicPlaceholder href="/errors/error-boundaries" />;
}
