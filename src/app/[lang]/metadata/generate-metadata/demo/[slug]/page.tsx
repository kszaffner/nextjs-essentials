import type { Metadata } from "next";
import {
  ArticleView,
  articleSlugs,
  buildLossyArticleMetadata,
  loadArticleForPage,
} from "@/modules/generate-metadata";

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/metadata/generate-metadata/demo/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return buildLossyArticleMetadata(slug);
}

export default async function Page({
  params,
}: PageProps<"/[lang]/metadata/generate-metadata/demo/[slug]">) {
  const { slug } = await params;
  const article = await loadArticleForPage(slug);

  return <ArticleView title={article.title} summary={article.summary} variant="lossy" />;
}
