import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/errors/error-boundaries/demo";

export const basics = (
  <>
    <p>
      An <code>error.tsx</code> file turns a route segment into a{" "}
      <strong>React error boundary</strong>. When something throws while the
      segment (or anything below it) renders, the boundary shows the exported
      component instead, and the rest of the app keeps working. It must be a
      Client Component.
    </p>
    <CodeBlock code={`"use client";

export default function Error({ error, retry }: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <button onClick={() => retry()}>Try again</button>;
}`} />
    <ul>
      <li>
        The <strong>nearest</strong> boundary above the failing component wins.
        Nesting them gives you fine-grained fallbacks.
      </li>
      <li>
        <code>retry()</code> re-fetches and re-renders the segment;{" "}
        <code>reset()</code> only clears the error state and re-renders without
        re-fetching.
      </li>
      <li>
        <code>global-error.tsx</code> (in the root of <code>app</code>) is the
        last resort: it replaces the root layout, so it renders its own{" "}
        <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code>. This project has
        one, and it reports to the error monitor.
      </li>
    </ul>
    <p>
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> has three scenarios on a production
      build: a page that throws, a layout that throws, and an event handler that
      throws. Each failing route and the parent segment have their own{" "}
      <code>error.tsx</code>, and the fallback names the file that caught the
      error.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>A segment&apos;s boundary does not wrap its own layout.</strong> A
      throwing <code>layout-crash/layout.tsx</code> was <em>not</em> caught by{" "}
      <code>layout-crash/error.tsx</code> but by the parent segment&apos;s{" "}
      <code>demo/error.tsx</code>, because the boundary sits below the layout.
      Errors in the root layout need <code>global-error.tsx</code>.
    </li>
    <li>
      <strong>The browser never gets the real message.</strong> For a Server
      Component error, the fallback received a generic message (a minified React
      error) and a <code>digest</code>; the text &quot;table users, column
      ssn&quot; stayed on the server. The server log held the real message and
      the same <code>digest</code>, so you can match a user report to a log
      line.
    </li>
    <li>
      <strong>Event handlers are not covered.</strong> Boundaries catch errors
      thrown while React renders. A throw in an <code>onClick</code> raised a
      window error but no boundary appeared and the page stayed as it was. Use{" "}
      <code>try/catch</code> in the handler and turn the failure into UI state.
    </li>
    <li>
      <strong>The status code may already be sent.</strong> A page error
      streamed after the shell leaves the HTTP status at <code>200</code> (the{" "}
      <code>global-error</code> test returned 200 too), so do not use the
      status to detect these errors.
    </li>
    <li>
      <strong>global-error replaces everything.</strong> When it rendered, the
      root layout&apos;s own content was gone. It does not load your global
      styles, so keep it self-contained.
    </li>
    <li>
      <strong>Reporting is a separate job.</strong> A boundary only shows a
      fallback. Real boundaries should send the error to monitoring in an
      effect; this project&apos;s <code>global-error.tsx</code> does. The
      demo&apos;s boundaries deliberately do not, because their errors are
      thrown by hand.
    </li>
    <li>
      <strong>Retry can fail again.</strong> <code>retry()</code> re-renders the
      same code against the same data; for a permanent bug it shows the fallback
      again.
    </li>
    <li>
      <strong>Component-level recovery exists.</strong> <code>catchError</code>{" "}
      (from <code>next/error</code>) wraps any part of a tree in a boundary that
      understands <code>redirect()</code> and <code>notFound()</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How does error.tsx work, and why must it be a Client Component?",
    answer: (
      <p>
        It wraps the segment in a React error boundary, which is a client-side
        mechanism, so it needs <code>&quot;use client&quot;</code>. When
        rendering throws inside the segment, the boundary shows your component
        with the error and a retry function.
      </p>
    ),
  },
  {
    question: "Does error.tsx catch errors in its own layout?",
    answer: (
      <p>
        No. The boundary wraps the page and nested layouts below it, not the
        layout or template of the same segment. The parent segment&apos;s
        boundary catches it, and the root layout needs{" "}
        <code>global-error.tsx</code>.
      </p>
    ),
  },
  {
    question: "What does the user see for a Server Component error in production?",
    answer: (
      <p>
        A generic message plus a <code>digest</code>, never the real text. The
        full error is in the server logs under the same digest, which lets you
        correlate a report with its cause without leaking internals.
      </p>
    ),
  },
  {
    question: "What do error boundaries not catch?",
    answer: (
      <p>
        Errors in event handlers, asynchronous code outside rendering, and
        errors in the boundary itself. Handle those with <code>try/catch</code>{" "}
        and state, and report unexpected ones.
      </p>
    ),
  },
  {
    question: "retry() or reset()?",
    answer: (
      <p>
        <code>retry()</code> re-fetches and re-renders the segment inside a
        transition, which fixes transient failures. <code>reset()</code> clears
        the error state and re-renders the children without re-fetching.
      </p>
    ),
  },
  {
    question: "What is global-error.tsx and how does it differ from error.tsx?",
    answer: (
      <p>
        It handles errors in the root layout, replaces it, and therefore must
        define its own <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code>.
        It is the last-resort boundary and does not get your global styles.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Error boundaries",
  summary: "error.tsx vs global-error.tsx.",
  basics,
  edgeCases,
  interviewQuestions,
};
