import { TopicPlaceholder, getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/metadata/sitemap-robots");

export default function Page() {
  return <TopicPlaceholder href="/metadata/sitemap-robots" />;
}
