import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/advanced-routing/proxy");

export default function Page() {
  return <TopicPlaceholder href="/advanced-routing/proxy" />;
}
