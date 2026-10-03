import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/revalidation");

export default function Page() {
  return <TopicPlaceholder href="/data/revalidation" />;
}
