import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/metadata/generate-metadata");

export default function Page() {
  return <TopicPlaceholder href="/metadata/generate-metadata" />;
}
