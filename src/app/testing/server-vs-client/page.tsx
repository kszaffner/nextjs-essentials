import { TestingComponentsTopic } from "@/modules/testing-components";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/testing/server-vs-client");

export default function Page() {
  return <TestingComponentsTopic />;
}
