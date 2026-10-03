import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/parallel-routes");

export default function Page() {
  return <TopicPlaceholder href="/fundamentals/parallel-routes" />;
}
