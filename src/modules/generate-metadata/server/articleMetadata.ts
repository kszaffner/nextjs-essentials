import "server-only";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { localizePath, type Locale } from "@/shared/i18n";
import { getArticle } from "./articles";

const DEMO_BASE = "/metadata/generate-metadata/demo";

async function requireArticle(slug: string) {
  const article = await getArticle(slug);
  if (!article) {
    notFound();
  }
  return article;
}

// Replaces `openGraph` outright: metadata is merged shallowly, so the
// layout's siteName and type are lost.
export async function buildLossyArticleMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const article = await requireArticle(slug);

  return {
    title: article.title,
    description: article.summary,
    // The canonical URL is the language-prefixed one, not the path that
    // redirects to it.
    alternates: { canonical: localizePath(locale, `${DEMO_BASE}/${article.slug}`) },
    openGraph: { title: article.title, description: article.summary },
  };
}

// Reads the metadata resolved so far (the parent segments') and builds on it.
export async function buildPreservingArticleMetadata(
  slug: string,
  locale: Locale,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const article = await requireArticle(slug);
  const parentOpenGraph = (await parent).openGraph;

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: localizePath(locale, `${DEMO_BASE}/preserved/${article.slug}`) },
    openGraph: { ...parentOpenGraph, title: article.title, description: article.summary },
  };
}

export async function loadArticleForPage(slug: string) {
  return requireArticle(slug);
}
