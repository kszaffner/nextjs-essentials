import { DynamicImportTopic } from "@/modules/dynamic-import";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/optimization/dynamic-import");

export default function Page() {
  return <DynamicImportTopic />;
}
