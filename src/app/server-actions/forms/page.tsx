import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/server-actions/forms");

export default function Page() {
  return <TopicPlaceholder href="/server-actions/forms" />;
}
