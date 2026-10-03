import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/parallel-vs-sequential");

export default function Page() {
  return <TopicPlaceholder href="/data/parallel-vs-sequential" />;
}
