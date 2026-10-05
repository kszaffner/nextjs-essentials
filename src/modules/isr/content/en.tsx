import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/rendering/isr/demo";

export const basics = (
  <>
    <p>
      Incremental Static Regeneration serves a prerendered result and rebuilds
      it in the background, so pages are as fast as static files without being
      frozen at build time. With Cache Components (on in this project) ISR is
      expressed on the cached data, not on the route:
    </p>
    <pre>
      <code>{`async function getCatalogSnapshot() {
  "use cache";
  cacheLife({ stale: 300, revalidate: 10, expire: 600 });
  cacheTag("catalog");
  return loadCatalog();
}`}</code>
    </pre>
    <ul>
      <li>
        <strong>Time-based:</strong> <code>cacheLife({"{ revalidate }"})</code>{" "}
        sets how long a result is considered fresh. The next request after that
        still gets the old result and triggers a regeneration
        (stale-while-revalidate); the request after it gets the new one.
      </li>
      <li>
        <strong>On demand:</strong> tag the data with <code>cacheTag</code> and
        call <code>revalidateTag(tag, &quot;max&quot;)</code> from a Server
        Action or Route Handler when the source changes.
      </li>
      <li>
        <code>expire</code> is the hard limit: after it passes with no
        traffic, the next request waits for fresh data instead of getting a
        stale one.
      </li>
    </ul>
    <p>
      The build output shows the lifetime next to the route:{" "}
      <code>○ /rendering/isr/demo 10s 10m</code> (revalidate, expire). Open the{" "}
      <LocalizedLink href={demoHref}>demo</LocalizedLink>, note the timestamp, wait over 10
      seconds, and reload twice. Or press the button: the page still shows the
      old value right after, and the next reload shows the regenerated one.
    </p>
    <p>
      <em>Contrast (previous model):</em> <code>export const revalidate = 60</code>{" "}
      on a route, or <code>getStaticProps</code> returning{" "}
      <code>revalidate</code> in the Pages Router.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>export const revalidate</code> no longer builds.
      </strong>{" "}
      With Cache Components it fails with{" "}
      <em>
        &quot;Route segment config &quot;revalidate&quot; is not compatible
        with `nextConfig.cacheComponents`. Please remove it.&quot;
      </em>{" "}
      Put the lifetime on the cached function with <code>cacheLife</code>.
    </li>
    <li>
      <strong>Regeneration is triggered by a request, not by a timer.</strong>{" "}
      Nothing happens when the interval elapses; the first visit afterwards is
      served stale and starts the rebuild. The same holds for{" "}
      <code>revalidateTag</code>: the call only marks data stale, and pages
      revalidate as they are visited.
    </li>
    <li>
      <strong>A short lifetime leaves the static shell.</strong> A{" "}
      <code>revalidate</code> of <code>0</code>, an <code>expire</code> under
      five minutes, or a <code>stale</code> under 30 seconds excludes the
      result from the prerender, turning it into a dynamic hole that needs a{" "}
      <code>&lt;Suspense&gt;</code> boundary. The demo uses{" "}
      <code>stale: 300, revalidate: 10, expire: 600</code> to stay prerendered.
    </li>
    <li>
      <strong>
        <code>expire</code> must be longer than <code>revalidate</code>.
      </strong>{" "}
      Next.js rejects the reverse.
    </li>
    <li>
      <strong>
        <code>revalidateTag</code> takes a profile as its second argument.
      </strong>{" "}
      The single-argument form is deprecated. <code>&quot;max&quot;</code>{" "}
      serves stale content while regenerating; to read your own write inside a
      Server Action, use <code>updateTag</code> instead.
    </li>
    <li>
      <strong>Server-only call sites.</strong> <code>revalidateTag</code> works
      in Server Functions and Route Handlers, not in Client Components or
      Proxy. And an action that invalidates real data must authorize the
      caller itself; the demo action is public only because it touches a demo
      entry.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is ISR, and how do you do it with Cache Components?",
    answer: (
      <p>
        Serving a prerendered result and regenerating it in the background.
        With Cache Components you cache the data or component with{" "}
        <code>&quot;use cache&quot;</code> and set its lifetime with{" "}
        <code>cacheLife</code> (<code>stale</code>, <code>revalidate</code>,{" "}
        <code>expire</code>), instead of <code>export const revalidate</code>.
      </p>
    ),
  },
  {
    question: "What does stale-while-revalidate mean for the user?",
    answer: (
      <p>
        After the revalidate interval, the next visitor still gets the cached
        (old) result instantly while a regeneration runs in the background; the
        visitor after that gets the fresh one. Nobody waits for the rebuild,
        until <code>expire</code> passes.
      </p>
    ),
  },
  {
    question: "revalidateTag, revalidatePath, updateTag: when do you use which?",
    answer: (
      <p>
        <code>revalidateTag</code> invalidates all data carrying a tag, across
        pages; <code>revalidatePath</code> invalidates a specific page or
        layout. Both mark data stale (use <code>&quot;max&quot;</code> for
        stale-while-revalidate). <code>updateTag</code> is for Server Actions
        that must show the new value immediately (read-your-own-writes).
      </p>
    ),
  },
  {
    question: "Why does export const revalidate fail in this project?",
    answer: (
      <p>
        Route segment config such as <code>revalidate</code> and{" "}
        <code>dynamic</code> is rejected when <code>cacheComponents</code> is
        on. Caching is expressed per function or component with{" "}
        <code>&quot;use cache&quot;</code> and <code>cacheLife</code>.
      </p>
    ),
  },
  {
    question: "How does a short cache lifetime affect prerendering?",
    answer: (
      <p>
        A <code>revalidate</code> of 0, an <code>expire</code> under five
        minutes, or a <code>stale</code> under 30 seconds keeps the result out
        of the static shell: it becomes a dynamic hole resolved at request
        time, so it needs a Suspense boundary.
      </p>
    ),
  },
  {
    question: "Where can revalidateTag be called?",
    answer: (
      <p>
        In Server Functions (Server Actions) and Route Handlers. It cannot be
        called from Client Components or Proxy.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Incremental Static Regeneration",
  summary: "Time-based and on-demand revalidation of prerendered output.",
  basics,
  edgeCases,
  interviewQuestions,
};
