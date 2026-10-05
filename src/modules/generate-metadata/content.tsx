import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/metadata/generate-metadata/demo";

export const basics = (
  <>
    <p>
      Next.js builds the <code>&lt;head&gt;</code> from metadata you export, not
      from tags you write. Two ways, both only in Server Components:
    </p>
    <ul>
      <li>
        <strong>Static:</strong> <code>export const metadata = {"{ … }"}</code>{" "}
        in a <code>layout</code> or <code>page</code>.
      </li>
      <li>
        <strong>Dynamic:</strong>{" "}
        <code>export async function generateMetadata({"{ params }"})</code>, which
        can fetch data and return the same shape.
      </li>
    </ul>
    <CodeBlock code={`// layout: defaults for everything below
export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: { template: "%s | Site", default: "Site" },
};

// page: computed per item
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);      // cached with React cache()
  return { title: article.title, alternates: { canonical: \`/blog/\${slug}\` } };
}`} />
    <p>
      <code>metadataBase</code> lets every URL-valued field use a relative path:
      the <code>canonical</code> above becomes an absolute URL. Open the{" "}
      <LocalizedLink href={demoHref}>demo</LocalizedLink>: two routes build metadata for the same
      article, and a button prints the tags the browser actually received.
      Observed in the prerendered HTML:
    </p>
    <ul>
      <li>
        the title is the page title wrapped by the layout&apos;s template (
        <code>Alpha: the first article · generateMetadata demo</code>);
      </li>
      <li>
        <code>canonical</code> was <code>/metadata/…/alpha</code> in code and an
        absolute URL in the output;
      </li>
      <li>
        the first route has <code>og:title</code> and <code>og:description</code>{" "}
        only, while the second also has <code>og:site_name</code> and{" "}
        <code>og:type</code> (see the first edge case).
      </li>
    </ul>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Merging is shallow.</strong> The layout defined{" "}
      <code>openGraph: {"{ siteName, type }"}</code>; a page that returned its own{" "}
      <code>openGraph: {"{ title, description }"}</code> <em>replaced</em> the
      whole object, so <code>og:site_name</code> and <code>og:type</code>{" "}
      disappeared. The fix in the second route reads the parent&apos;s resolved
      metadata and spreads it: <code>{"{ ...(await parent).openGraph, title }"}</code>.
    </li>
    <li>
      <strong>
        <code>metadataBase</code> is baked in at build time.
      </strong>{" "}
      Built without <code>SITE_ORIGIN</code>, every canonical, <code>og:image</code>,
      the sitemap, and robots pointed at <code>http://localhost:3000</code>, even
      when the server later started with the variable set. Set the origin in the
      environment of the <em>build</em>.
    </li>
    <li>
      <strong>Do not build the base from the request.</strong> The site URL comes
      from configuration (<code>SITE_ORIGIN</code>, or Vercel&apos;s production
      domain), so a caller cannot make your pages advertise their own host.
    </li>
    <li>
      <strong>Fetch once, use twice.</strong> <code>generateMetadata</code> and
      the page both need the article. Wrapping the loader in React&apos;s{" "}
      <code>cache()</code> (or using <code>fetch</code>, which is memoized)
      makes the lookup run once per render.
    </li>
    <li>
      <strong>Runtime data defers metadata.</strong> With Cache Components,
      metadata that reads <code>cookies()</code>, <code>headers()</code>, or
      uncached data streams in at request time. If the rest of the page is fully
      prerenderable, Next.js raises an error and asks for an explicit choice:
      cache the data with <code>&quot;use cache&quot;</code>, or add a dynamic
      marker. A <code>&quot;use cache&quot;</code> <code>generateMetadata</code>{" "}
      must return serializable values, so return <code>metadataBase</code> as a
      string, not a <code>URL</code>.
    </li>
    <li>
      <strong>Streaming is skipped for crawlers.</strong> For dynamic pages
      metadata streams in after the first paint, but for bots such as
      Twitterbot, Slackbot, and Bingbot Next.js blocks until it is in the{" "}
      <code>&lt;head&gt;</code> (configurable with <code>htmlLimitedBots</code>).
      Prerendered pages resolve it at build time.
    </li>
    <li>
      <strong>An unknown param should 404.</strong> The demo calls{" "}
      <code>notFound()</code> for an unknown slug, from the shared loader, so
      the metadata and the page agree (the status is a real 404).
    </li>
    <li>
      <strong>Never write head tags by hand.</strong> Putting{" "}
      <code>&lt;title&gt;</code> or <code>&lt;meta&gt;</code> in a layout bypasses
      streaming and de-duplication; use the metadata API.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "metadata or generateMetadata?",
    answer: (
      <p>
        Use the static <code>metadata</code> object when the values are known
        up front; use <code>generateMetadata</code> when they depend on params
        or fetched data. Both are Server Component only and are merged from the
        root layout down to the page.
      </p>
    ),
  },
  {
    question: "How are metadata objects from layout and page combined?",
    answer: (
      <p>
        Shallowly, from the root down: a later segment replaces earlier keys
        wholesale. A nested object such as <code>openGraph</code> defined in a
        page replaces the layout&apos;s entirely. To extend it, read the
        resolved parent metadata and spread it.
      </p>
    ),
  },
  {
    question: "What does metadataBase do?",
    answer: (
      <p>
        It is the base URL for URL-valued fields, so you can write relative
        paths (<code>canonical: &quot;/blog/x&quot;</code>, an Open Graph image)
        and get absolute URLs. Set it once in the root layout, and make sure the
        value exists at build time, because prerendered pages bake it in.
      </p>
    ),
  },
  {
    question: "How do you avoid fetching the same data in generateMetadata and the page?",
    answer: (
      <p>
        Request memoization: <code>fetch</code> calls with the same URL and
        options are deduped in a render, and other loaders can be wrapped in{" "}
        <code>React.cache()</code>. The demo does the latter and the loader runs
        once.
      </p>
    ),
  },
  {
    question: "What happens to generateMetadata with Cache Components?",
    answer: (
      <p>
        It follows the normal rules: runtime or uncached data defers it to
        request time, and if the page is otherwise static, Next.js makes you
        choose between caching the data (<code>&quot;use cache&quot;</code>) and
        marking the page dynamic. Metadata streams for browsers but is blocking
        for crawlers.
      </p>
    ),
  },
  {
    question: "Why is title.template useful?",
    answer: (
      <p>
        A layout sets the pattern once (<code>&quot;%s | Site&quot;</code>) and
        every page supplies only its own title, so the suffix stays consistent
        and cannot be forgotten.
      </p>
    ),
  },
];
