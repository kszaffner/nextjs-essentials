import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoHref = "/data/fetch-extensions/demo";

export const basics = (
  <>
    <p>
      Next.js extends the web <code>fetch</code> with options that control
      caching. Caching is <strong>opt-in</strong>: a plain{" "}
      <code>fetch(url)</code> is not cached.
    </p>
    <ul>
      <li>
        <code>cache: &quot;force-cache&quot;</code> stores the response and
        reuses it. <code>cache: &quot;no-store&quot;</code> always fetches.
      </li>
      <li>
        <code>next.revalidate: seconds</code> caches the response and refreshes
        it in the background after that time (stale-while-revalidate).
      </li>
      <li>
        <code>next.tags: [...]</code> labels the entry so{" "}
        <code>revalidateTag</code> can invalidate it on demand. It labels; it
        does not turn caching on by itself.
      </li>
    </ul>
    <p>
      Separately, identical <code>GET</code> requests (same URL and options)
      inside one render pass are <strong>memoized</strong>: they run once and
      share the result.
    </p>
    <p>
      The <Link href={demoHref}>demo</Link> calls this app&apos;s own API,
      which counts how many times it really ran. Reload and watch which rows
      keep growing (uncached) and which stay put (cached). Observed here:{" "}
      <code>default</code>, <code>no-store</code>, and tags alone hit the API
      every time; <code>force-cache</code>, <code>next.revalidate</code>, and{" "}
      <code>force-cache</code> with tags are served from cache; the same URL
      fetched twice in one render shows one hit; and{" "}
      <code>revalidateTag</code> refreshes only the tagged entry.
    </p>
    <p>
      <em>Contrast (older versions):</em> up to Next.js 14, <code>GET</code>{" "}
      fetches were cached by default. For new code with Cache Components,{" "}
      <code>&quot;use cache&quot;</code> is the recommended way to cache data
      (see the migration topic).
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Tags alone do not cache.</strong> <code>next: {"{ tags }"}</code>{" "}
      without <code>force-cache</code> or <code>revalidate</code> still hits
      the network on every request, so there is nothing for{" "}
      <code>revalidateTag</code> to invalidate. Combine them.
    </li>
    <li>
      <strong>The cache key is the whole request.</strong> URL, method,
      headers, and body together: two requests that differ in any of them are
      cached separately (the demo gives each row its own query string).
    </li>
    <li>
      <strong>Uncached fetches need Suspense.</strong> With Cache Components, a
      request that is not cached counts as runtime data. Outside{" "}
      <code>&lt;Suspense&gt;</code> the build fails, and the error names{" "}
      <code>fetch(...)</code> next to <code>cookies()</code> and{" "}
      <code>headers()</code>.
    </li>
    <li>
      <strong>Memoization is per render, not persistent.</strong> It covers
      Server Components, layouts, pages, and metadata functions in one pass. It
      does not apply in Route Handlers, and passing an{" "}
      <code>AbortController</code> signal opts a request out.
    </li>
    <li>
      <strong>revalidate is stale-while-revalidate.</strong> After the
      interval the next request still gets the old response and triggers the
      refresh. <code>revalidateTag(tag, &quot;max&quot;)</code> behaves the
      same: the first request after it is served stale.
    </li>
    <li>
      <strong>Conflicting options are ignored.</strong>{" "}
      <code>{"{ revalidate: 3600, cache: \"no-store\" }"}</code> is not allowed;
      both are dropped and development prints a warning.
    </li>
    <li>
      <strong>Never build the URL from the request.</strong> The demo reads its
      own origin from configuration, not the <code>Host</code> header, because
      a caller-controlled host would let anyone steer the server&apos;s
      outgoing fetch (SSRF). Parse the response with a schema too.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Is fetch cached by default in the App Router?",
    answer: (
      <p>
        Not in current versions: caching is opt-in. Use{" "}
        <code>cache: &quot;force-cache&quot;</code> or{" "}
        <code>next.revalidate</code> to cache. (Up to Next.js 14, GET fetches
        were cached by default.)
      </p>
    ),
  },
  {
    question: "What do next.revalidate and next.tags do?",
    answer: (
      <p>
        <code>next.revalidate</code> caches the response and refreshes it in
        the background after N seconds. <code>next.tags</code> labels the cached
        entry so <code>revalidateTag</code> can invalidate it on demand. Tags
        alone do not enable caching.
      </p>
    ),
  },
  {
    question: "What is request memoization and how is it different from the Data Cache?",
    answer: (
      <p>
        Memoization dedupes identical GET requests during a single render pass
        so each runs once; it is per request and in memory. The Data Cache
        persists responses across requests and is controlled by{" "}
        <code>cache</code> and <code>next.revalidate</code>. They are separate
        layers (see the cache layers topic).
      </p>
    ),
  },
  {
    question: "What is in the cache key of a fetch?",
    answer: (
      <p>
        The URL, method, headers, and body. A request that differs in any of
        them is a different cache entry.
      </p>
    ),
  },
  {
    question: "How do you invalidate one cached fetch on demand?",
    answer: (
      <p>
        Tag it (<code>next: {"{ tags: [\"posts\"] }"}</code>) together with{" "}
        <code>force-cache</code>, then call <code>revalidateTag(&quot;posts&quot;, &quot;max&quot;)</code>{" "}
        from a Server Action or Route Handler. Untagged entries stay cached.
      </p>
    ),
  },
  {
    question: "Why must an uncached fetch sit inside Suspense with Cache Components?",
    answer: (
      <p>
        Because it cannot complete during prerendering, it would block the
        static shell. A boundary lets Next.js prerender the shell with a
        fallback and stream the fetch result per request.
      </p>
    ),
  },
];
