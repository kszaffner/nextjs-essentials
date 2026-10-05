import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoBase = "/rendering/static-vs-dynamic/demo";

export const basics = (
  <>
    <p>
      With Cache Components (on in this project) Next.js prerenders every route
      at build time into a <strong>static shell</strong>. Whether a piece of UI
      ends up in the shell depends on what it uses:
    </p>
    <ul>
      <li>
        <strong>Predictable values</strong> (literals, pure computations,
        module imports, <code>fs.readFileSync</code>) finish at build time and
        are part of the shell automatically.
      </li>
      <li>
        <strong><code>&quot;use cache&quot;</code></strong> results are cached
        and included in the shell when their lifetime is long enough.
      </li>
      <li>
        <strong>Runtime data</strong> (<code>cookies()</code>,{" "}
        <code>headers()</code>, <code>searchParams</code>, params without
        samples), uncached <code>fetch()</code>, and{" "}
        <code>connection()</code> cannot be known at build time. They must sit
        behind <code>&lt;Suspense&gt;</code>: the fallback goes in the shell
        and the content streams in per request.
      </li>
    </ul>
    <p>
      So &quot;static&quot; and &quot;dynamic&quot; are no longer a property of
      a whole route; a route is a static shell with optional dynamic holes.
      The build output shows the result: <code>○ (Static)</code> is prerendered
      as static content, <code>◐ (Partial Prerender)</code> is prerendered
      static HTML with dynamic server-streamed content.
    </p>
    <p>
      Compare the <LocalizedLink href={`${demoBase}/static`}>static route</LocalizedLink> with the{" "}
      <LocalizedLink href={`${demoBase}/mixed`}>route with a dynamic part</LocalizedLink>. On a
      production build their responses differ: the static one is a cache hit
      served with <code>Cache-Control: s-maxage=31536000</code>; the mixed one
      carries <code>x-nextjs-postponed: 1</code>, is streamed in chunks, and
      its HTML already contains the Suspense fallback.
    </p>
    <p>
      <em>Contrast (previous model):</em> without Cache Components, calling{" "}
      <code>cookies()</code> or reading <code>searchParams</code> anywhere
      silently made the <em>whole route</em> dynamic (marked ƒ), and{" "}
      <code>export const dynamic = &quot;force-dynamic&quot;</code> forced it.
    </p>
    <CodeBlock title="app/page.tsx" code={`
import { Suspense } from "react";
import { connection } from "next/server";

export default function Page() {
  return (
    <>
      <p>Same for everyone: rendered once, at build time.</p>
      <Suspense fallback={<p>Loading…</p>}>
        <Now />
      </Suspense>
    </>
  );
}

// Request-time work (connection(), cookies(), headers(), searchParams)
// makes this part dynamic; the Suspense boundary keeps the rest static.
async function Now() {
  await connection();
  return <p>Rendered at {new Date().toISOString()}</p>;
}
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Runtime data outside Suspense fails the build.</strong> Reading{" "}
      <code>await cookies()</code> in a page without a boundary gives:{" "}
      <em>
        &quot;Next.js encountered uncached or runtime data during
        prerendering.&quot;
      </em>{" "}
      The error lists <code>fetch(...)</code>, <code>cookies()</code>,{" "}
      <code>headers()</code>, <code>params</code>, <code>searchParams</code>,
      and <code>connection()</code> as the triggers.
    </li>
    <li>
      <strong>Time and randomness are runtime data too.</strong>{" "}
      <code>new Date()</code> or <code>Math.random()</code> in a Server
      Component fails with <em>&quot;encountered the unstable value
      `new Date()` while prerendering&quot;</em>, because the value would be
      frozen at build time. Use <code>connection()</code> inside Suspense for a
      per-request value, or <code>&quot;use cache&quot;</code> to share one.
    </li>
    <li>
      <strong>
        <code>force-dynamic</code> is rejected.
      </strong>{" "}
      <code>export const dynamic = &quot;force-dynamic&quot;</code> fails with{" "}
      <em>
        &quot;Route segment config &quot;dynamic&quot; is not compatible with
        `nextConfig.cacheComponents`. Please remove it.&quot;
      </em>{" "}
      Express dynamism by placing runtime access behind Suspense instead.
    </li>
    <li>
      <strong>Place Suspense as deep as possible.</strong> A boundary around
      the whole page makes the shell just a fallback; a boundary around only
      the dynamic widget keeps the rest of the page static and instant.
    </li>
    <li>
      <strong>A static shell is not always CDN-served.</strong> On Vercel the
      shell comes from the CDN. With <code>next start</code> the mixed route
      still responds with <code>no-store</code> and streams the dynamic part,
      so check the headers in the environment you deploy to.
    </li>
    <li>
      <strong>Judge rendering from <code>next build</code>, not <code>next dev</code>.</strong>{" "}
      The ○ / ◐ symbols and the response headers describe the production
      build; the dev server renders on demand.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How does Next.js decide whether a route is static or dynamic?",
    answer: (
      <p>
        With Cache Components it prerenders the whole tree and looks at what
        each part uses. Predictable values and cached results go into the
        static shell; runtime data, uncached fetches, and{" "}
        <code>connection()</code> must be behind Suspense and render per
        request. In the previous model, any dynamic API flipped the whole
        route to dynamic rendering.
      </p>
    ),
  },
  {
    question: "What do ○ and ◐ mean in the build output?",
    answer: (
      <p>
        <code>○ (Static)</code>: prerendered as static content.{" "}
        <code>◐ (Partial Prerender)</code>: prerendered as static HTML, with
        dynamic server-streamed content filling the Suspense holes.
      </p>
    ),
  },
  {
    question: "What happens if you read cookies() in a page with no Suspense boundary?",
    answer: (
      <p>
        The build fails: runtime data accessed outside <code>&lt;Suspense&gt;</code>{" "}
        prevents the route from producing a static shell. Wrap the component
        that reads it in Suspense with a fallback (or cache the access).
      </p>
    ),
  },
  {
    question: "Why does new Date() break prerendering, and how do you fix it?",
    answer: (
      <p>
        At build time it would be evaluated once and baked into the shell, so
        every visitor would see the build timestamp. Next.js rejects that.
        Read the time after <code>connection()</code> inside Suspense for a
        value per request, or wrap it in <code>&quot;use cache&quot;</code> to
        share one deliberately.
      </p>
    ),
  },
  {
    question: "What replaces export const dynamic = \"force-dynamic\"?",
    answer: (
      <p>
        Nothing is forced at the route level: the config is rejected with
        Cache Components. You mark the specific dynamic part by accessing
        runtime data (or <code>connection()</code>) inside a Suspense
        boundary, and the rest stays in the static shell.
      </p>
    ),
  },
  {
    question: "How do you check what Next.js actually produced?",
    answer: (
      <p>
        Read the <code>next build</code> route table (○ vs ◐) and inspect
        response headers on a production build: a static route is a cache
        hit with a long <code>s-maxage</code>, a partially prerendered one
        carries <code>x-nextjs-postponed</code> and streams.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Static vs dynamic rendering",
  summary: "When Next.js prerenders a route and when it renders per request.",
  basics,
  edgeCases,
  interviewQuestions,
};
