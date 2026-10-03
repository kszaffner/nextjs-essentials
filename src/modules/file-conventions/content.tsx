import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoHref = "/fundamentals/file-conventions/demo";

export const basics = (
  <>
    <p>
      A route segment is a folder; special file names inside it decide what
      the segment renders. Next.js nests them in a fixed order:{" "}
      <code>layout</code> → <code>template</code> → <code>error</code> →{" "}
      <code>loading</code> → <code>not-found</code> → <code>page</code>.
    </p>
    <ul>
      <li>
        <code>page.tsx</code> makes a segment publicly reachable. A folder
        without one is not a route.
      </li>
      <li>
        <code>layout.tsx</code> is shared UI that stays mounted while
        navigating between its children, so state (and DOM) survives.
      </li>
      <li>
        <code>template.tsx</code> is like a layout, but it remounts whenever
        the child segment below it changes.
      </li>
      <li>
        <code>loading.tsx</code> wraps the page (and nested layouts) in a{" "}
        <code>&lt;Suspense&gt;</code> boundary with this fallback.
      </li>
      <li>
        <code>error.tsx</code> is a Client Component error boundary for the
        segment and everything below it.
      </li>
      <li>
        <code>not-found.tsx</code> renders when the segment calls{" "}
        <code>notFound()</code>.
      </li>
      <li>
        <code>(group)</code> folders organize routes without adding to the
        URL; <code>_private</code> folders opt out of routing entirely.
      </li>
    </ul>
    <p>
      Try it in the <Link href={demoHref}>live demo</Link>: type into the
      layout input and the template input, then use the demo links. The
      layout input keeps its text; the template input is emptied.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>error.tsx</code> does not catch errors from the layout or
        template of its own segment.
      </strong>{" "}
      They bubble to the parent segment&apos;s boundary. Errors in the root
      layout need <code>global-error.tsx</code>.
    </li>
    <li>
      <strong>
        <code>loading.tsx</code> does not cover the layout of its own
        segment.
      </strong>{" "}
      With Cache Components, runtime data read in a layout needs its own{" "}
      <code>&lt;Suspense&gt;</code> boundary, otherwise the build fails.
    </li>
    <li>
      <strong>Layouts do not re-render on navigation,</strong> so a Server
      Component layout cannot read the current pathname or search params
      reliably. Read them in a Client Component with{" "}
      <code>usePathname</code> / <code>useSearchParams</code>.
    </li>
    <li>
      <strong>A template&apos;s remount costs state and DOM.</strong> Client
      state resets, effects re-run, and Suspense fallbacks show on every
      navigation, not just the first load.
    </li>
    <li>
      <strong>
        Two route groups must not resolve to the same URL
      </strong>{" "}
      (<code>(a)/about</code> and <code>(b)/about</code> is a build error).
      Navigating between different root layouts triggers a full page load.
    </li>
    <li>
      <strong>
        <code>_private</code> folders are not routable
      </strong>{" "}
      (the{" "}
      <Link href={`${demoHref}/_private`} prefetch={false}>
        demo link
      </Link>{" "}
      is a 404). To
      get a literal underscore in a URL, write <code>%5F</code>.
    </li>
    <li>
      <strong>
        <code>page.tsx</code> and <code>route.ts</code> cannot share a
        segment.
      </strong>{" "}
      Both would own the same URL.
    </li>
    <li>
      <strong>In production, Server Component errors are masked.</strong>{" "}
      <code>error.tsx</code> receives a generic message plus a{" "}
      <code>digest</code> to match against server logs.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is the difference between layout.tsx and template.tsx?",
    answer: (
      <p>
        Both wrap their children, but a layout persists across navigations
        (no remount, state kept), while a template gets a new key when the
        child segment changes and remounts: state resets, effects re-run,
        DOM is recreated. In the demo, the layout input keeps its text and
        the template input does not.
      </p>
    ),
  },
  {
    question: "In what order do the special files nest?",
    answer: (
      <p>
        <code>layout</code> → <code>template</code> → <code>error</code>{" "}
        (error boundary) → <code>loading</code> (Suspense) →{" "}
        <code>not-found</code> → <code>page</code>. That order explains what
        each file can and cannot catch or cover.
      </p>
    ),
  },
  {
    question: "Why must error.tsx be a Client Component, and what does it not catch?",
    answer: (
      <p>
        Error boundaries are a client-side React mechanism, so the file needs{" "}
        <code>&quot;use client&quot;</code>. It wraps the segment&apos;s page
        and nested layouts, but not the layout or template in the same
        segment; for the root layout use <code>global-error.tsx</code>. It
        also does not catch errors in event handlers or Server Actions.
      </p>
    ),
  },
  {
    question: "How does loading.tsx work?",
    answer: (
      <p>
        It is sugar for a <code>&lt;Suspense&gt;</code> boundary around the
        page and nested layouts, with <code>loading.tsx</code> as the
        fallback. The fallback is prefetched, so navigation can show it
        immediately while the page streams in.
      </p>
    ),
  },
  {
    question: "Do route groups change the URL? When would you use one?",
    answer: (
      <p>
        No: <code>(group)</code> is dropped from the path. Use it to organize
        by feature or team, to opt only some routes into a shared layout, or
        to define multiple root layouts. Mind the caveats: groups must not
        collide on a URL, and moving between root layouts is a full page
        load.
      </p>
    ),
  },
  {
    question: "How do you keep a folder out of routing?",
    answer: (
      <p>
        Prefix it with an underscore (<code>_components</code>). It is
        colocated with routes but never becomes a segment. A folder without a{" "}
        <code>page.tsx</code> or <code>route.ts</code> is also not
        reachable, but the underscore makes the intent explicit and
        protects against adding one by accident.
      </p>
    ),
  },
  {
    question: "What happens when a page calls notFound()?",
    answer: (
      <p>
        Rendering stops and the closest <code>not-found.tsx</code> renders in
        its place, inside the surrounding layouts. The root{" "}
        <code>not-found.tsx</code> also handles any URL that matches no
        route.
      </p>
    ),
  },
];
