import { ErrorBoundariesTopic } from "@/modules/error-boundaries";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/errors/error-boundaries");

export default function Page() {
  return <ErrorBoundariesTopic />;
}
