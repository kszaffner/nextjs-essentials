import { FetchExtensionsTopic } from "@/modules/fetch-extensions";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/fetch-extensions");

export default function Page() {
  return <FetchExtensionsTopic />;
}
