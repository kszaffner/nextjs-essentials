import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/server-actions/form-hooks");

export default function Page() {
  return <TopicPlaceholder href="/server-actions/form-hooks" />;
}
