import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/rendering/ppr");

export default function Page() {
  return <TopicPlaceholder href="/rendering/ppr" />;
}
