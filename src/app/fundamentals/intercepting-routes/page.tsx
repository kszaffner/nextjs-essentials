import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/intercepting-routes");

export default function Page() {
  return <TopicPlaceholder href="/fundamentals/intercepting-routes" />;
}
