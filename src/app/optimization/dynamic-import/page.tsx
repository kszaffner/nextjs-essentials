import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/optimization/dynamic-import");

export default function Page() {
  return <TopicPlaceholder href="/optimization/dynamic-import" />;
}
