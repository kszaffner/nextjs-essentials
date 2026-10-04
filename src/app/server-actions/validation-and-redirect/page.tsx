import { ValidationAndRedirectTopic } from "@/modules/validation-and-redirect";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/server-actions/validation-and-redirect");

export default function Page() {
  return <ValidationAndRedirectTopic />;
}
