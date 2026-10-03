import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/optimization/bundlers");

export default function Page() {
  return <TopicPlaceholder href="/optimization/bundlers" />;
}
