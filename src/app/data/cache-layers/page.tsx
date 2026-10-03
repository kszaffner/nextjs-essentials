import { CacheLayersTopic } from "@/modules/cache-layers";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/data/cache-layers");

export default function Page() {
  return <CacheLayersTopic />;
}
