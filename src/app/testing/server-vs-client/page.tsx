import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/testing/server-vs-client");

export default function Page() {
  return <TopicPlaceholder href="/testing/server-vs-client" />;
}
