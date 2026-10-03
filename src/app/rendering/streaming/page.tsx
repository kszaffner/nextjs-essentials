import { StreamingTopic } from "@/modules/streaming";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/rendering/streaming");

export default function Page() {
  return <StreamingTopic />;
}
