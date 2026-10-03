import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/advanced-routing/runtimes");

export default function Page() {
  return <TopicPlaceholder href="/advanced-routing/runtimes" />;
}
