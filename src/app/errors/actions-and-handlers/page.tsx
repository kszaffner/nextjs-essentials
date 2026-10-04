import { ActionsAndHandlersTopic } from "@/modules/actions-and-handlers";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/errors/actions-and-handlers");

export default function Page() {
  return <ActionsAndHandlersTopic />;
}
