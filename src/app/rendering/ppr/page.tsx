import { PprTopic } from "@/modules/ppr";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/rendering/ppr");

export default function Page() {
  return <PprTopic />;
}
