import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/components/use-client-boundary");

export default function Page() {
  return <TopicPlaceholder href="/components/use-client-boundary" />;
}
