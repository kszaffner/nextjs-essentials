import {
  ParamsReport,
  getDynamicSegmentsText,
  isPrerenderedBlogSlug,
  prerenderedBlogSlugs,
} from "@/modules/dynamic-segments";
import { readLocale } from "@/shared/i18n";

export function generateStaticParams() {
  return prerenderedBlogSlugs.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/dynamic-segments/demo/blog/[slug]">) {
  const [{ slug }, locale] = await Promise.all([params, readLocale(params)]);
  const { notes } = getDynamicSegmentsText(locale);

  return (
    <ParamsReport
      locale={locale}
      routePattern="/blog/[slug]"
      params={{ lang: locale, slug }}
      note={isPrerenderedBlogSlug(slug) ? notes.prerendered : notes.runtime}
    />
  );
}
