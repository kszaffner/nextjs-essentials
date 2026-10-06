import type { Metadata, ResolvingMetadata } from "next";
import {
  ArticleView,
  articleSlugs,
  buildPreservingArticleMetadata,
  loadArticleForPage,
} from "@/modules/generate-metadata";
import { readLocale } from "@/shared/i18n";

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/metadata/generate-metadata/demo/preserved/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  return buildPreservingArticleMetadata(slug, await readLocale(params), parent);
}

export default async function Page({
  params,
}: PageProps<"/[lang]/metadata/generate-metadata/demo/preserved/[slug]">) {
  const { slug } = await params;
  const locale = await readLocale(params);
  const article = await loadArticleForPage(slug);

  return <ArticleView locale={locale} title={article.title} summary={article.summary} variant="preserved" />;
}
