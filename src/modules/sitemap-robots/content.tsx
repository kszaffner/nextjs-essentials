import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/metadata/sitemap-robots/demo";

export const basics = (
  <>
    <p>
      <code>sitemap.ts</code> and <code>robots.ts</code> in <code>app/</code> are
      special Route Handlers that produce <code>/sitemap.xml</code> and{" "}
      <code>/robots.txt</code>. They return typed objects (
      <code>MetadataRoute.Sitemap</code>, <code>MetadataRoute.Robots</code>)
      and Next.js serializes them.
    </p>
    <CodeBlock code={`export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://example.com/", priority: 1 }];
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://example.com/sitemap.xml",
  };
}`} />
    <p>
      This site generates both from the topic catalog: the sitemap lists the home
      page and every topic (38 URLs), never the demo pages or the API, and
      robots.txt keeps crawlers out of <code>/api/</code> and points at the
      sitemap. Open the <LocalizedLink href={demoHref}>demo</LocalizedLink> to fetch the real
      files. Observed: <code>sitemap.xml</code> is served as{" "}
      <code>application/xml</code>, <code>robots.txt</code> as{" "}
      <code>text/plain</code>, and both are prerendered at build time (marked{" "}
      <code>○</code>).
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>lastModified: new Date()</code> lies and breaks caching.
      </strong>{" "}
      It does not fail the build. Instead <code>/sitemap.xml</code> became
      dynamic (<code>ƒ</code>) and reported a new <em>now</em> on every request
      (two requests two seconds apart returned two different values), telling
      crawlers every page changed just now. Omit the field unless you know the
      real date.
    </li>
    <li>
      <strong>Absolute URLs are baked at build time.</strong> The sitemap and
      the <code>Sitemap:</code> line come from <code>getSiteUrl()</code>, which
      reads <code>SITE_ORIGIN</code>. Built without it, both listed{" "}
      <code>localhost:3000</code> even with the variable set at runtime.
    </li>
    <li>
      <strong>Cached by default.</strong> Both files are special Route Handlers
      that are cached unless they read request-time data or dynamic config, so
      a new topic appears in the sitemap after the next build, not live.
    </li>
    <li>
      <strong>robots.txt is a request, not security.</strong> A polite crawler
      obeys it; nothing stops anyone from fetching a disallowed URL, and it
      publishes the paths you list. Protect private pages with authentication,
      and use <code>noindex</code> metadata to keep a page out of results.
    </li>
    <li>
      <strong>A disallowed page can still be indexed.</strong> Blocking a URL in
      robots.txt stops crawling, so the crawler never sees a{" "}
      <code>noindex</code> on it. To remove a page, allow crawling and mark it{" "}
      <code>noindex</code>.
    </li>
    <li>
      <strong>List canonical, indexable URLs only.</strong> Demo pages, API
      routes, and redirects do not belong. The sitemap protocol allows at most
      50,000 URLs per file; larger sites split it with{" "}
      <code>generateSitemaps</code>.
    </li>
    <li>
      <strong>Keep the logic testable.</strong> The builders are pure functions
      of a base URL and a list, unit tested; the route files only compose them,
      so the two modules stay independent.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How do you add a sitemap and robots.txt in the App Router?",
    answer: (
      <p>
        Add <code>sitemap.ts</code> and <code>robots.ts</code> to{" "}
        <code>app/</code> returning <code>MetadataRoute.Sitemap</code> and{" "}
        <code>MetadataRoute.Robots</code>, or static <code>sitemap.xml</code> and{" "}
        <code>robots.txt</code> files. Next.js serves them at the root URLs.
      </p>
    ),
  },
  {
    question: "Are these files cached?",
    answer: (
      <p>
        Yes, by default: they are special Route Handlers prerendered at build
        time, unless they use request-time APIs or dynamic config. That is why
        the sitemap should not contain values like <code>new Date()</code>.
      </p>
    ),
  },
  {
    question: "Does Disallow in robots.txt keep a page out of search results?",
    answer: (
      <p>
        No. It stops crawling, not indexing: the URL can still appear if other
        pages link to it, and the crawler cannot read a <code>noindex</code> on
        a page it may not fetch. Use <code>noindex</code> and allow crawling.
      </p>
    ),
  },
  {
    question: "Why must the site origin be known at build time?",
    answer: (
      <p>
        The sitemap, robots, canonical links, and Open Graph URLs are
        prerendered with absolute URLs. Built without the origin, they carry the
        fallback host even if the server later has the variable.
      </p>
    ),
  },
  {
    question: "How do you handle a site with more than 50,000 URLs?",
    answer: (
      <p>
        The sitemap protocol allows 50,000 URLs per file, so split it into several
        sitemaps with <code>generateSitemaps</code>, which produces a numbered file
        per chunk, and reference them from robots.txt
        or a sitemap index.
      </p>
    ),
  },
];
