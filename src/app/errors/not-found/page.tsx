import { NotFoundTopic } from "@/modules/not-found";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/errors/not-found");

export default function Page() {
  return <NotFoundTopic />;
}
