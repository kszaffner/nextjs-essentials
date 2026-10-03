import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/server-actions/validation-and-redirect");

export default function Page() {
  return <TopicPlaceholder href="/server-actions/validation-and-redirect" />;
}
