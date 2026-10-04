import { BundlersTopic } from "@/modules/bundlers";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/optimization/bundlers");

export default function Page() {
  return <BundlersTopic />;
}
