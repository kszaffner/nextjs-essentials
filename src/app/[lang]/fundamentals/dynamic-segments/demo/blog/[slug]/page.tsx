import {
  ParamsReport,
  isPrerenderedBlogSlug,
  prerenderedBlogSlugs,
} from "@/modules/dynamic-segments";

export function generateStaticParams() {
  return prerenderedBlogSlugs.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/dynamic-segments/demo/blog/[slug]">) {
  const { slug } = await params;

  return (
    <ParamsReport
      routePattern="/blog/[slug]"
      params={{ slug }}
      note={
        isPrerenderedBlogSlug(slug)
          ? "Listed in generateStaticParams: prerendered at build time."
          : "Not listed in generateStaticParams: rendered on the first request, then cached (dynamicParams defaults to true)."
      }
    />
  );
}
