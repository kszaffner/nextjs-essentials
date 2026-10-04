import { TestingActionsTopic } from "@/modules/testing-actions";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/testing/mocking-and-actions");

export default function Page() {
  return <TestingActionsTopic />;
}
