import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoHref = "/advanced-routing/proxy/demo";

export const basics = (
  <>
    <p>
      <code>proxy.ts</code> (at the root of <code>src</code>, next to{" "}
      <code>app</code>) runs <strong>before a request is completed</strong>: before
      the cache and before any route renders. For each request it can continue,
      rewrite, redirect, change headers or cookies, or answer directly.
    </p>
    <pre>
      <code>{`export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL("/target", request.url));
}

export const config = { matcher: ["/demo/:path*"] };`}</code>
    </pre>
    <p>
      Four things the <Link href={demoHref}>demo</Link> does, observed with{" "}
      <code>curl -i</code> on a production build:
    </p>
    <ul>
      <li>
        <strong>Redirect:</strong> <code>/old</code> answers{" "}
        <code>307 Temporary Redirect</code> with a <code>Location</code> header.
      </li>
      <li>
        <strong>Rewrite:</strong> <code>/alias</code> answers <code>200</code>{" "}
        with the content of <code>/target</code>; the URL does not change.
      </li>
      <li>
        <strong>Personalization:</strong> <code>/personalized</code> is
        rewritten to variant A or B. A first visit gets a random variant and a{" "}
        <code>demo-variant</code> cookie; a visit that sends the cookie keeps its
        variant and gets no new cookie.
      </li>
      <li>
        <strong>Respond directly:</strong> <code>/blocked</code> answers{" "}
        <code>403</code> from the proxy; no route runs.
      </li>
    </ul>
    <p>
      The decisions live in a pure function (<code>decideProxyAction</code>)
      that <code>proxy.ts</code> turns into a response, so they are unit
      tested without a request.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>It runs before the cache.</strong> A prerendered page served as a
      cache hit (<code>x-nextjs-cache: HIT</code>) still carried the
      proxy&apos;s <code>x-demo-proxy: ran</code> header: the proxy sees every
      matched request even when the page itself is static.
    </li>
    <li>
      <strong>Without a matcher it runs on everything.</strong> That includes{" "}
      <code>_next/static</code>, images, and <code>public/</code>. Match exactly
      the paths you need, or exclude assets with a negative pattern.
    </li>
    <li>
      <strong>Request headers and response headers differ.</strong> The demo
      sets a <em>request</em> header (<code>x-demo-proxy-decision</code>) with{" "}
      <code>NextResponse.next({"{ request: { headers } }"})</code> so a Server
      Component can read it, and a <em>response</em> header
      (<code>x-demo-proxy</code>) that only the browser sees. Pass information
      to the app through request headers, cookies, rewrites, or the URL; do not
      share modules or globals with it.
    </li>
    <li>
      <strong>Never trust the cookie.</strong> A tampered{" "}
      <code>demo-variant=zzz</code> was ignored and replaced with a valid
      assignment because the value is parsed first.
    </li>
    <li>
      <strong>A matcher also decides Server Action coverage.</strong> Server
      Actions are POSTs to the route where they are used, so a path excluded
      from the matcher skips the proxy for its actions too. Authenticate inside
      every action instead of relying on the proxy alone.
    </li>
    <li>
      <strong>Keep it fast and small.</strong> It sits in front of every matched
      request: no database lookups or full content fetches. Heavy logic belongs
      in the route.
    </li>
    <li>
      <strong>It runs on Node.js, and the name changed.</strong> The old{" "}
      <code>middleware.ts</code> still works with a deprecation warning, but it
      ran on the Edge runtime (see the runtimes topic). The docs recommend
      reaching for the proxy as a last resort.
    </li>
    <li>
      <strong>Order matters.</strong> <code>headers</code> and{" "}
      <code>redirects</code> from <code>next.config</code> run first, then the
      proxy, then <code>beforeFiles</code> rewrites, the filesystem routes, and
      the later rewrites.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is proxy.ts and where does it sit in the request flow?",
    answer: (
      <p>
        A file at the root of <code>src</code> whose <code>proxy</code> function
        runs before the cache and before routes render. It can redirect,
        rewrite, set headers and cookies, or respond itself. In order: config
        headers and redirects, then the proxy, then rewrites and filesystem
        routes.
      </p>
    ),
  },
  {
    question: "What is the difference between a redirect and a rewrite?",
    answer: (
      <p>
        A redirect sends the browser to another URL (<code>307</code>/
        <code>308</code>, and the address bar changes). A rewrite serves another
        route&apos;s content under the original URL; the browser never sees the
        change.
      </p>
    ),
  },
  {
    question: "How would you do A/B testing with it?",
    answer: (
      <p>
        On the first visit, pick a variant and set a cookie; rewrite to the
        variant&apos;s route. On later visits, read and validate the cookie so
        the user keeps the same variant. Both variants can stay static pages.
      </p>
    ),
  },
  {
    question: "Why should you set a matcher?",
    answer: (
      <p>
        Without one the proxy runs on every request, including static assets and
        images, wasting work and risking logic that was meant for pages only.
      </p>
    ),
  },
  {
    question: "Can you rely on the proxy for authorization?",
    answer: (
      <p>
        Not alone. A matcher change can silently remove coverage, and Server
        Actions are POSTs to the route that uses them. Use it for cheap
        optimistic checks and redirects, and verify authentication and
        authorization again inside each Server Action and Route Handler.
      </p>
    ),
  },
  {
    question: "How is proxy.ts different from the old middleware.ts?",
    answer: (
      <p>
        It is the renamed, clarified convention: <code>middleware.ts</code> is
        deprecated (a codemod migrates it). The proxy runs on Node.js and does
        not accept a <code>runtime</code> option; <code>middleware.ts</code> ran
        on the Edge runtime.
      </p>
    ),
  },
];
