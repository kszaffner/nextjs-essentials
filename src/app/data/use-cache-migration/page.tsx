import { UseCacheMigrationTopic } from "@/modules/use-cache-migration";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/use-cache-migration");

export default function Page() {
  return <UseCacheMigrationTopic />;
}
