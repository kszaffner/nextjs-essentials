import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/errors/actions-and-handlers");

export default function Page() {
  return <TopicPlaceholder href="/errors/actions-and-handlers" />;
}
