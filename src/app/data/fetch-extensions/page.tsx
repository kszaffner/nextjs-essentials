import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/fetch-extensions");

export default function Page() {
  return <TopicPlaceholder href="/data/fetch-extensions" />;
}
