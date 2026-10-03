import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/cache-layers");

export default function Page() {
  return <TopicPlaceholder href="/data/cache-layers" />;
}
