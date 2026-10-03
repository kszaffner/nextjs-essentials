import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/errors/not-found");

export default function Page() {
  return <TopicPlaceholder href="/errors/not-found" />;
}
