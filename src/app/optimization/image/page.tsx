import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/optimization/image");

export default function Page() {
  return <TopicPlaceholder href="/optimization/image" />;
}
