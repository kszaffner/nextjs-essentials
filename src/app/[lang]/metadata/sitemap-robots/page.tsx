import { SitemapRobotsTopic } from "@/modules/sitemap-robots";
import { generateTopicMetadata } from "@/modules/topic-catalog";
import { readLocale } from "@/shared/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/metadata/sitemap-robots">) {
  const locale = await readLocale(params);
  return generateTopicMetadata("/metadata/sitemap-robots", locale);
}

export default async function Page({ params }: PageProps<"/[lang]/metadata/sitemap-robots">) {
  const locale = await readLocale(params);
  return <SitemapRobotsTopic locale={locale} />;
}
