import type { Metadata, ResolvingMetadata } from "next";
import {
  ArticleView,
  articleSlugs,
  buildPreservingArticleMetadata,
  loadArticleForPage,
} from "@/modules/generate-metadata";

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: PageProps<"/metadata/generate-metadata/demo/preserved/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  return buildPreservingArticleMetadata(slug, parent);
}

export default async function Page({
  params,
}: PageProps<"/metadata/generate-metadata/demo/preserved/[slug]">) {
  const { slug } = await params;
  const article = await loadArticleForPage(slug);

  return <ArticleView title={article.title} summary={article.summary} variant="preserved" />;
}
