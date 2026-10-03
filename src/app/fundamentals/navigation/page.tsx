import { NavigationTopic } from "@/modules/navigation";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/navigation");

export default function Page() {
  return <NavigationTopic />;
}
