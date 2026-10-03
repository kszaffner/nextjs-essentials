import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/testing/mocking-and-actions");

export default function Page() {
  return <TopicPlaceholder href="/testing/mocking-and-actions" />;
}
