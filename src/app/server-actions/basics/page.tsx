import { ServerActionsBasicsTopic } from "@/modules/server-actions-basics";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/server-actions/basics");

export default function Page() {
  return <ServerActionsBasicsTopic />;
}
