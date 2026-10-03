import { StaticVsDynamicTopic } from "@/modules/static-vs-dynamic";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/rendering/static-vs-dynamic");

export default function Page() {
  return <StaticVsDynamicTopic />;
}
