import { FontTopic } from "@/modules/font";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/optimization/font");

export default function Page() {
  return <FontTopic />;
}
