import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/components/composition");

export default function Page() {
  return <TopicPlaceholder href="/components/composition" />;
}
