import { UseClientBoundaryTopic } from "@/modules/use-client-boundary";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/components/use-client-boundary");

export default function Page() {
  return <UseClientBoundaryTopic />;
}
