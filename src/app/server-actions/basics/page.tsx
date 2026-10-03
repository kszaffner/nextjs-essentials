import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/server-actions/basics");

export default function Page() {
  return <TopicPlaceholder href="/server-actions/basics" />;
}
