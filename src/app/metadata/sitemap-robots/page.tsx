import { SitemapRobotsTopic } from "@/modules/sitemap-robots";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/metadata/sitemap-robots");

export default function Page() {
  return <SitemapRobotsTopic />;
}
