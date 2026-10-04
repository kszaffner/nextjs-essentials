import { GenerateMetadataTopic } from "@/modules/generate-metadata";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/metadata/generate-metadata");

export default function Page() {
  return <GenerateMetadataTopic />;
}
