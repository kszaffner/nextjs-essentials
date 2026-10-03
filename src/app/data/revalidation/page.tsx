import { RevalidationTopic } from "@/modules/revalidation";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/revalidation");

export default function Page() {
  return <RevalidationTopic />;
}
