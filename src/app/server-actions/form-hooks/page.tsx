import { FormHooksTopic } from "@/modules/form-hooks";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/server-actions/form-hooks");

export default function Page() {
  return <FormHooksTopic />;
}
