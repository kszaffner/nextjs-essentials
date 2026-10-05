import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/rendering/ppr/demo";

export const basics = (
  <>
    <p>
      Partial Prerendering is the default rendering model with Cache
      Components: every route is split into a <strong>static shell</strong>{" "}
      prerendered at build time and <strong>dynamic holes</strong> that stream
      in per request. There is no flag per route; what a part uses decides
      where it lands:
    </p>
    <ul>
      <li>
        <strong>Static:</strong> predictable values, in the shell.
      </li>
      <li>
        <strong>Cached:</strong> <code>&quot;use cache&quot;</code> with a{" "}
        <code>cacheLife</code> long enough to be prerendered, in the shell.
      </li>
      <li>
        <strong>Dynamic:</strong> runtime data, uncached I/O, or a cache with a
        very short lifetime, behind <code>&lt;Suspense&gt;</code>.
      </li>
    </ul>
    <table>
      <thead>
        <tr>
          <th scope="col">Profile</th>
          <th scope="col">stale</th>
          <th scope="col">revalidate</th>
          <th scope="col">expire</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>seconds</code></td><td>30 s</td><td>1 s</td><td>1 min</td></tr>
        <tr><td><code>minutes</code></td><td>5 min</td><td>1 min</td><td>1 hour</td></tr>
        <tr><td><code>hours</code></td><td>5 min</td><td>1 hour</td><td>1 day</td></tr>
        <tr><td><code>days</code></td><td>5 min</td><td>1 day</td><td>1 week</td></tr>
        <tr><td><code>max</code></td><td>5 min</td><td>30 days</td><td>1 year</td></tr>
      </tbody>
    </table>
    <p>
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> shows all four kinds on one page.
      Requesting it, the first streamed chunk already contains the static part,
      the hourly cached timestamp (from the build, and the same on every
      request), and the two Suspense fallbacks; the request-time part changes
      on every request, and the seconds-cache part refreshes about every
      second. The build output marks the route <code>◐</code>.
    </p>
    <CodeBlock title="app/page.tsx" code={`
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { connection } from "next/server";

export default function Page() {
  return (
    <>
      <h1>Static shell</h1>                         {/* prerendered at build */}
      <Cached />                                    {/* cached: part of the shell */}
      <Suspense fallback={<p>Loading…</p>}>
        <PerRequest />                              {/* streamed per request */}
      </Suspense>
    </>
  );
}

async function Cached() {
  "use cache";
  cacheLife("hours");
  return <p>{new Date().toISOString()}</p>;
}

async function PerRequest() {
  await connection(); // opts out of prerendering: runs for each request
  return <p>{new Date().toISOString()}</p>;
}
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Cached code cannot read runtime data.</strong> A{" "}
      <code>&quot;use cache&quot;</code> function or component cannot call{" "}
      <code>cookies()</code>, <code>headers()</code>, or read{" "}
      <code>searchParams</code> (the restriction follows the call stack). Read
      them outside and pass the values in as arguments, which also become part
      of the cache key.
    </li>
    <li>
      <strong>Cache lifetime decides shell membership.</strong> A short{" "}
      <code>cacheLife</code> (<code>seconds</code> has an{" "}
      <code>expire</code> of one minute) is excluded from the prerender and
      becomes a hole, while <code>hours</code> stays in the shell. Only the
      hole needs a Suspense boundary.
    </li>
    <li>
      <strong>The shell&apos;s cached values can be old.</strong> The hourly
      timestamp in the demo is from the build, not from your request. Tag it
      with <code>cacheTag</code> and call <code>revalidateTag</code> to refresh
      it on demand.
    </li>
    <li>
      <strong>Unstable values still fail the build.</strong> <code>new Date()</code>{" "}
      or <code>Math.random()</code> outside a cache or a boundary is an error
      (&quot;unstable value … while prerendering&quot;); wrap it in{" "}
      <code>&quot;use cache&quot;</code> to share one value, or read it after{" "}
      <code>connection()</code> inside Suspense.
    </li>
    <li>
      <strong>Pair every directive with a cacheLife.</strong> Without one, the
      implicit <code>default</code> profile applies (15 minutes to revalidate,
      never expires), which may not be what you intended.
    </li>
    <li>
      <strong>A hole costs a server render per request.</strong> The shell is
      cheap and instant; the holes are not. Keep holes small and deep.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is Partial Prerendering?",
    answer: (
      <p>
        Rendering a route as a static shell, prerendered at build time and
        servable from a CDN, plus dynamic holes that stream in per request
        behind Suspense boundaries. With Cache Components it is the default;
        you do not opt in per route.
      </p>
    ),
  },
  {
    question: "What goes in the static shell and what becomes a hole?",
    answer: (
      <p>
        Predictable values and <code>&quot;use cache&quot;</code> results with a
        long enough lifetime go in the shell. Runtime data (<code>cookies()</code>,{" "}
        <code>headers()</code>, <code>searchParams</code>), uncached fetches,{" "}
        <code>connection()</code>, and caches with a very short lifetime are
        holes and need Suspense.
      </p>
    ),
  },
  {
    question: "What do stale, revalidate, and expire mean in cacheLife?",
    answer: (
      <p>
        <code>stale</code>: how long a client may reuse the result without
        asking the server. <code>revalidate</code>: after this, the next request
        gets the old result and triggers a background refresh.{" "}
        <code>expire</code>: after this with no traffic, the next request waits
        for fresh content.
      </p>
    ),
  },
  {
    question: "Why can't a use cache function read cookies()?",
    answer: (
      <p>
        A cached result is shared between requests, so it must not depend on a
        single request. Read the cookie outside, pass the value as an argument
        (it joins the cache key), or use a different strategy such as a
        per-request hole.
      </p>
    ),
  },
  {
    question: "How do you refresh cached content on demand?",
    answer: (
      <p>
        Tag it with <code>cacheTag</code> inside the cached function and call{" "}
        <code>revalidateTag(tag, &quot;max&quot;)</code> from a Server Action or
        Route Handler. The next request is served stale while it regenerates.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Partial Prerendering",
  summary: "\"use cache\", cacheLife, and cacheTag with a static shell.",
  basics,
  edgeCases,
  interviewQuestions,
};
