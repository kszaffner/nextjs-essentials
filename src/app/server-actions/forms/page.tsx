import { FormsTopic } from "@/modules/forms";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/server-actions/forms");

export default function Page() {
  return <FormsTopic />;
}
