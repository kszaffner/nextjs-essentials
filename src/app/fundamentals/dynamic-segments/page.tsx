import { DynamicSegmentsTopic } from "@/modules/dynamic-segments";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/dynamic-segments");

export default function Page() {
  return <DynamicSegmentsTopic />;
}
