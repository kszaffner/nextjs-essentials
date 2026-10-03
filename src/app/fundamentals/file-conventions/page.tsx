import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/file-conventions");

export default function Page() {
  return <TopicPlaceholder href="/fundamentals/file-conventions" />;
}
