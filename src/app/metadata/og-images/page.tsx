import { OgImagesTopic } from "@/modules/og-images";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/metadata/og-images");

export default function Page() {
  return <OgImagesTopic />;
}
