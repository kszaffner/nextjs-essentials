import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/metadata/og-images/demo";

export const basics = (
  <>
    <p>
      An <code>opengraph-image.tsx</code> file in a route segment generates the
      image shown when the page is shared, and Next.js wires up the{" "}
      <code>og:image</code> and <code>twitter:image</code> tags for you. It
      returns an <code>ImageResponse</code> (from <code>next/og</code>) built from
      JSX:
    </p>
    <CodeBlock code={`export const alt = "About Acme";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;
  return new ImageResponse(<div style={{ display: "flex" }}>{slug}</div>, size);
}`} />
    <p>
      This site has a site-wide <code>src/app/opengraph-image.tsx</code>, and the{" "}
      <LocalizedLink href={demoHref}>demo</LocalizedLink> adds a per-slug one. Observed on a
      production build: the file is a real PNG, 1200×630 (read from its header),
      about 40 KB; the home page&apos;s head has <code>og:image</code> pointing
      at the site-wide image, and a demo page&apos;s head points at its own, with{" "}
      <code>og:image:width</code>, <code>height</code>, <code>type</code>, and{" "}
      <code>alt</code>, plus the matching <code>twitter:*</code> tags.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>The closest file wins; they do not stack.</strong> A segment&apos;s
      own <code>opengraph-image</code> replaced the site-wide one: the demo
      page&apos;s head carried one image URL, not two.
    </li>
    <li>
      <strong>Only flexbox and a subset of CSS.</strong> The image is rendered by
      Satori, not a browser: <code>display: grid</code> does not work, and every
      container with several children needs <code>display: flex</code>. Use
      inline styles.
    </li>
    <li>
      <strong>A 500 KB bundle limit.</strong> JSX, CSS, fonts, and images used by
      the image together must stay under 500 KB. Fonts must be{" "}
      <code>ttf</code>, <code>otf</code>, or <code>woff</code> (not{" "}
      <code>woff2</code>), and the built-in font covers Latin text only.
    </li>
    <li>
      <strong>URLs need a base and a cache buster.</strong> The tag content was an
      absolute URL (from <code>metadataBase</code>) with a hash query such as{" "}
      <code>?b71dcc3d044fcc1b</code>, so a changed image gets a new URL and
      social platforms refetch it. The response itself was{" "}
      <code>public, max-age=0, must-revalidate</code>.
    </li>
    <li>
      <strong>Generated at build when it can be.</strong> Without request-time
      APIs the images are prerendered and cached (marked <code>○</code> for the
      site-wide one, <code>●</code> for the per-slug ones). Reading{" "}
      <code>params</code> without <code>generateStaticParams</code> would make
      them request-time.
    </li>
    <li>
      <strong>Platforms cache hard and have limits.</strong> Share previews are
      cached by the platform, not by you, and have size limits (8 MB for Open
      Graph, 5 MB for Twitter images). Debug with the platform&apos;s preview
      tool and expect a delay after changes.
    </li>
    <li>
      <strong>Always set alt.</strong> Export <code>alt</code> so{" "}
      <code>og:image:alt</code> and <code>twitter:image:alt</code> are filled; it
      describes the image for people who cannot see it.
    </li>
    <li>
      <strong>Unknown params should 404.</strong> The per-slug image calls{" "}
      <code>notFound()</code> for a slug that does not exist, instead of
      generating a card for nothing.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How do you generate an Open Graph image in Next.js?",
    answer: (
      <p>
        Add an <code>opengraph-image.tsx</code> to a segment that default-exports
        a function returning <code>new ImageResponse(&lt;JSX /&gt;, size)</code>{" "}
        and exports <code>alt</code>, <code>size</code>, and{" "}
        <code>contentType</code>. Next.js adds the meta tags automatically.
      </p>
    ),
  },
  {
    question: "What are the limits of ImageResponse?",
    answer: (
      <p>
        It uses Satori: flexbox and a subset of CSS (no grid), a 500 KB total
        bundle, ttf/otf/woff fonts only, and Latin by default. Complex layouts
        need to be simplified or the assets fetched at runtime.
      </p>
    ),
  },
  {
    question: "Which image does a nested route use?",
    answer: (
      <p>
        The closest <code>opengraph-image</code> in the route tree. A segment&apos;s
        file overrides the one above it, so you can have a site default and
        per-item images.
      </p>
    ),
  },
  {
    question: "Are generated images cached?",
    answer: (
      <p>
        By default they are prerendered at build time and cached, unless they
        use request-time APIs. Dynamic route images need{" "}
        <code>generateStaticParams</code> to be prerendered. The meta tag URL
        carries a content hash so changes are picked up.
      </p>
    ),
  },
  {
    question: "Why does the og:image URL need to be absolute?",
    answer: (
      <p>
        Crawlers fetch it from outside your site, so a relative path is
        useless. <code>metadataBase</code> turns relative paths into absolute
        URLs, which is why it must be set correctly at build time.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Open Graph images",
  summary: "Generated images with opengraph-image.tsx.",
  basics,
  edgeCases,
  interviewQuestions,
};
