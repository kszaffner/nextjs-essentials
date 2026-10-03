import { CompositionTopic } from "@/modules/composition";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/components/composition");

export default function Page() {
  return <CompositionTopic />;
}
