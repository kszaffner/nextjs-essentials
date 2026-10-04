import { ProxyTopic } from "@/modules/proxy";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/advanced-routing/proxy");

export default function Page() {
  return <ProxyTopic />;
}
