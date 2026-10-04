import { RuntimesTopic } from "@/modules/runtimes";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/advanced-routing/runtimes");

export default function Page() {
  return <RuntimesTopic />;
}
