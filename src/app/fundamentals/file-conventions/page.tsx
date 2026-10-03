import { FileConventionsTopic } from "@/modules/file-conventions";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/fundamentals/file-conventions");

export default function Page() {
  return <FileConventionsTopic />;
}
