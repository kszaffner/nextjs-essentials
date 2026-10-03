import { ParallelRoutesTopic } from "@/modules/parallel-routes";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/parallel-routes");

export default function Page() {
  return <ParallelRoutesTopic />;
}
