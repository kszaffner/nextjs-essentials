import type { MetadataRoute } from "next";
import { defaultLocale, localizePath, locales } from "@/shared/i18n";

// The home page plus every topic page, once per language, as absolute URLs.
// Each entry lists its translations under `alternates`, which Next.js renders
// as xhtml:link hreflang elements. No lastModified: the real date of a change
// is not known here. A guess such as new Date() does not fail the build, but it
// makes the file dynamic and reports "now" on every request, which tells
// crawlers that every page changed just now.
export function buildSitemap(siteUrl: URL, topicHrefs: readonly string[]): MetadataRoute.Sitemap {
  const paths = ["/", ...topicHrefs];

  return paths.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(locales.map((locale) => [locale, absolute(siteUrl, localizePath(locale, path))])),
      "x-default": absolute(siteUrl, localizePath(defaultLocale, path)),
    };
    return locales.map((locale) => ({
      url: absolute(siteUrl, localizePath(locale, path)),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages },
    }));
  });
}

function absolute(siteUrl: URL, path: string): string {
  return new URL(path, siteUrl).toString();
}

// Crawlers may read everything except the demo APIs, and are pointed at the
// sitemap.
export function buildRobots(siteUrl: URL): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
