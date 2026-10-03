import { InterceptingRoutesTopic } from "@/modules/intercepting-routes";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/intercepting-routes");

export default function Page() {
  return <InterceptingRoutesTopic />;
}
