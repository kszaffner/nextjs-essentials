import type { MetadataRoute } from "next";

// The home page plus every topic page, as absolute URLs. No lastModified: the
// real date of a change is not known here. A guess such as new Date() does not
// fail the build, but it makes the file dynamic and reports "now" on every
// request, which tells crawlers that every page changed just now.
export function buildSitemap(siteUrl: URL, topicHrefs: readonly string[]): MetadataRoute.Sitemap {
  const paths = ["/", ...topicHrefs];

  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

// Crawlers may read everything except the demo APIs, and are pointed at the
// sitemap.
export function buildRobots(siteUrl: URL): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
