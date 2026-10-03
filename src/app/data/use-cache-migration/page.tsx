import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/use-cache-migration");

export default function Page() {
  return <TopicPlaceholder href="/data/use-cache-migration" />;
}
