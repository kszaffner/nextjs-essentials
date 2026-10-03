import { IsrTopic } from "@/modules/isr";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/rendering/isr");

export default function Page() {
  return <IsrTopic />;
}
