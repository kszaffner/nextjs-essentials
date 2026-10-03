import { PitfallsTopic } from "@/modules/component-pitfalls";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/components/pitfalls");

export default function Page() {
  return <PitfallsTopic />;
}
