import { FetchingStrategiesTopic } from "@/modules/parallel-vs-sequential";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/parallel-vs-sequential");

export default function Page() {
  return <FetchingStrategiesTopic />;
}
