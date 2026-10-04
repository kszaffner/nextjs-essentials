import { WebVitalsTopic } from "@/modules/web-vitals";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/optimization/web-vitals");

export default function Page() {
  return <WebVitalsTopic />;
}
