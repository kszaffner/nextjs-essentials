import { RouteHandlersTopic } from "@/modules/route-handlers";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/advanced-routing/route-handlers");

export default function Page() {
  return <RouteHandlersTopic />;
}
