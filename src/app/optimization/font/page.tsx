import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/optimization/font");

export default function Page() {
  return <TopicPlaceholder href="/optimization/font" />;
}
