import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/metadata/og-images");

export default function Page() {
  return <TopicPlaceholder href="/metadata/og-images" />;
}
