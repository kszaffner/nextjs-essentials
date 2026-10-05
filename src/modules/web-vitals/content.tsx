import { LocalizedLink } from "@/shared/i18n";
import type { InterviewQuestion } from "@/shared/topic-page";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/optimization/web-vitals/demo";

export const basics = (
  <>
    <p>
      <strong>Core Web Vitals</strong> measure what users feel: how fast the main
      content appears (<strong>LCP</strong>), how quickly the page answers input (
      <strong>INP</strong>), and how much it jumps around (<strong>CLS</strong>).{" "}
      <strong>TTFB</strong> and <strong>FCP</strong> are supporting metrics. Google&apos;s
      thresholds: LCP is good up to 2.5 s and poor over 4 s, INP good up to 200
      ms and poor over 500 ms, CLS good up to 0.1 and poor over 0.25.
    </p>
    <p>
      Next.js hands you the measurements with <code>useReportWebVitals</code>{" "}
      (from <code>next/web-vitals</code>). It needs <code>&quot;use client&quot;</code>,
      so use a tiny component that renders nothing and mount it in the root
      layout:
    </p>
    <CodeBlock code={`"use client";
import { useReportWebVitals } from "next/web-vitals";

const report = (metric) => { /* send it somewhere */ };   // a stable reference

export function WebVitals() {
  useReportWebVitals(report);
  return null;
}`} />
    <p>
      This site mounts such a collector in the root layout and keeps the latest
      value of each metric in a small store. The <LocalizedLink href={demoHref}>demo</LocalizedLink>{" "}
      shows them with a rating. On a production build the TTFB was reported and
      rated (22 ms, good).
    </p>
    <p>
      <strong>Bundle analysis.</strong> To see why the JavaScript is the size it is,
      run <code>pnpm analyze</code> (<code>next experimental-analyze</code>). It
      builds a visual map you can filter by route, switch between client and
      server, and follow import chains in, including across{" "}
      <code>&quot;use client&quot;</code> and dynamic-import boundaries. With{" "}
      <code>--output</code> it writes static files to{" "}
      <code>.next/diagnostics/analyze</code> instead of starting a server; here
      that took 25 s and produced a 46 MB folder you can copy and compare after a
      refactor.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Not every metric exists at load.</strong> TTFB and FCP are known
      early; LCP is final only after the first interaction or when the tab is
      hidden, and INP needs an interaction. CLS and INP are reported again as
      they change, so the store keeps only the newest value per name.
    </li>
    <li>
      <strong>Some things could not be measured here.</strong> In the automated
      browser used to check this demo only TTFB was reported: it recorded no
      paint timing at all (<code>performance.getEntriesByType(&quot;paint&quot;)</code>{" "}
      was empty), so FCP, LCP, and INP never fired, even after real clicks.
      Check them in a normal browser; the rating logic itself is unit tested.
    </li>
    <li>
      <strong>The callback must not change.</strong> New functions passed to the
      hook are called with the metrics seen so far, so an inline function
      reports duplicates. Pass a module-level function, as the collector does.
    </li>
    <li>
      <strong>Keep the client boundary tiny.</strong> The collector renders
      nothing, so mounting it in the layout adds JavaScript but no client
      markup, and the layout stays a Server Component.
    </li>
    <li>
      <strong>Lab and field disagree.</strong> A local run on a fast machine is
      not what visitors see. Collect real-user numbers (send them with{" "}
      <code>navigator.sendBeacon</code> to an endpoint that validates them) and
      look at percentiles, not one load.
    </li>
    <li>
      <strong>Reporting costs something.</strong> Sampling, batching, and not
      sending personal data keep it cheap and safe. A beacon endpoint is a
      public route: validate its input like any other.
    </li>
    <li>
      <strong>Sizes are no longer in the build output.</strong> Since Next.js
      16.0, <code>next build</code> does not print JavaScript size metrics. Use
      the analyzer, which only works with Turbopack.
    </li>
    <li>
      <strong>Earlier topics are the levers.</strong> A preloaded hero improves
      LCP, a size-adjusted fallback font and reserved image space protect CLS,
      streaming and static shells help FCP, and dynamic imports shrink the JS
      that blocks interaction (INP).
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What are the Core Web Vitals?",
    answer: (
      <p>
        Largest Contentful Paint (loading), Interaction to Next Paint
        (responsiveness), and Cumulative Layout Shift (visual stability), with
        thresholds of 2.5 s, 200 ms, and 0.1 for &quot;good&quot;. TTFB and FCP
        are related metrics that help diagnose them.
      </p>
    ),
  },
  {
    question: "How do you measure them in a Next.js app?",
    answer: (
      <p>
        <code>useReportWebVitals</code> from <code>next/web-vitals</code>, in a
        small Client Component mounted in the root layout, passing it a stable
        callback that forwards each metric to your analytics.
      </p>
    ),
  },
  {
    question: "Why are some metrics missing right after the page loads?",
    answer: (
      <p>
        They are not final yet. LCP settles on the first interaction or when the
        page is hidden, and INP needs an interaction. CLS and INP are reported
        several times, so you keep the latest value.
      </p>
    ),
  },
  {
    question: "How do you find out what is in your JavaScript bundle?",
    answer: (
      <p>
        <code>next experimental-analyze</code> (Turbopack only) builds an
        interactive view by route, client or server, with the import chain for
        each module. Use <code>--output</code> to write it to disk and compare
        before and after a change.
      </p>
    ),
  },
  {
    question: "Which Next.js features improve each vital?",
    answer: (
      <p>
        LCP: <code>next/image</code> with <code>preload</code> and a static or
        streamed shell. CLS: image width and height, and the size-adjusted
        fallback from <code>next/font</code>. INP: less client JavaScript
        (Server Components, <code>next/dynamic</code>).
      </p>
    ),
  },
  {
    question: "Why can lab numbers mislead you?",
    answer: (
      <p>
        A single run on a fast machine and network misses slow devices, cold
        caches, and third-party scripts. Field data from real users, summarized
        as percentiles, is what the vitals are judged on.
      </p>
    ),
  },
];
