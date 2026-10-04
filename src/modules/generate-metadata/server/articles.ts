import "server-only";
import { cache } from "react";

export type Article = {
  slug: string;
  title: string;
  summary: string;
};

const articles: readonly Article[] = [
  { slug: "alpha", title: "Alpha: the first article", summary: "A short summary of the first article." },
  { slug: "beta", title: "Beta: the second article", summary: "A short summary of the second article." },
];

export const articleSlugs = articles.map((article) => article.slug);

// cache() dedupes calls within one render, so generateMetadata and the page
// can both ask for the article and the lookup still runs once.
export const getArticle = cache(async (slug: string): Promise<Article | undefined> => {
  return articles.find((article) => article.slug === slug);
});
