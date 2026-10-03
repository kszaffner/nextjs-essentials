import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/advanced-routing/route-handlers");

export default function Page() {
  return <TopicPlaceholder href="/advanced-routing/route-handlers" />;
}
