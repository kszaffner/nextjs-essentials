import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoHref = "/optimization/dynamic-import/demo";

export const basics = (
  <>
    <p>
      <code>next/dynamic</code> loads a component&apos;s code only when it is
      needed, in its own chunk. It is a composite of{" "}
      <code>React.lazy()</code> and <code>&lt;Suspense&gt;</code>.
    </p>
    <pre>
      <code>{`"use client";

const Heavy = dynamic(() => import("./HeavyPanel").then((m) => m.HeavyPanel), {
  ssr: false,                       // skip the server render
  loading: () => <p>Loading…</p>,   // shown while the chunk loads
});

{isOpen ? <Heavy /> : null}          // the chunk is requested on first render`}</code>
    </pre>
    <ul>
      <li>
        <strong>Server Components</strong> are code split automatically; there is
        nothing to do.
      </li>
      <li>
        <strong>Client Components</strong> ship in the page bundle unless you
        defer them with <code>dynamic()</code>.
      </li>
      <li>
        <code>ssr: false</code> also leaves the component out of the server HTML,
        which suits things that need the browser (a chart, an editor).
      </li>
    </ul>
    <p>
      Try the <Link href={demoHref}>demo</Link>. Observed on a production build:
      the heavy panel (<code>ssr: false</code>) was not in the server HTML and
      had no preload; its code is its own chunk; opening it fetched exactly one
      new script (22 scripts at load, 23 after). The second panel is a dynamic
      import that <em>is</em> server-rendered: it is in the HTML, but its
      JavaScript is still split into a separate chunk. (The demo&apos;s chunks
      are about 1 KB each; the mechanism matters, and real wins come from large
      libraries.)
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>ssr: false</code> only works in Client Components.
      </strong>{" "}
      In a Server Component it fails the build with{" "}
      <em>
        &quot;`ssr: false` is not allowed with `next/dynamic` in Server
        Components. Please move it into a Client Component.&quot;
      </em>{" "}
      The demo&apos;s <code>dynamic()</code> calls live in a{" "}
      <code>&quot;use client&quot;</code> file.
    </li>
    <li>
      <strong>A Server Component cannot split a Client Component this way.</strong>{" "}
      When a Server Component dynamically imports a Client Component, automatic
      code splitting is currently not supported, so wrap the{" "}
      <code>dynamic()</code> call in a Client Component.
    </li>
    <li>
      <strong>No server HTML means no content for crawlers.</strong> With{" "}
      <code>ssr: false</code> nothing of the component is in the first HTML
      (verified for the heavy panel). Do not use it for content that should be
      indexed or that is above the fold.
    </li>
    <li>
      <strong>Reserve the space.</strong> A component that appears after its
      chunk loads can shift the layout. Give the <code>loading</code> fallback
      (or its container) the final size.
    </li>
    <li>
      <strong>Named exports need an adapter.</strong> <code>dynamic()</code>{" "}
      expects a default export; for a named one return it from the import:{" "}
      <code>.then((module) =&gt; module.HeavyPanel)</code>.
    </li>
    <li>
      <strong>Defer what is large and rarely used.</strong> Splitting a tiny
      component adds a network request for no gain. Good candidates are modals,
      charts, editors, and libraries behind a click; you can also{" "}
      <code>await import(&quot;library&quot;)</code> inside an event handler.
    </li>
    <li>
      <strong>Where the request happens matters.</strong> The chunk is requested
      when the dynamic component first renders, not at page load, so the user
      sees the <code>loading</code> fallback on a slow network. Prefetch on
      hover if the delay hurts.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What does next/dynamic do?",
    answer: (
      <p>
        It lazy loads a component: its code goes into a separate chunk fetched
        when the component first renders, with an optional{" "}
        <code>loading</code> fallback. It combines <code>React.lazy()</code> and{" "}
        <code>Suspense</code> and works the same in the App Router.
      </p>
    ),
  },
  {
    question: "What does ssr: false change, and where is it allowed?",
    answer: (
      <p>
        The component is skipped during server rendering and rendered only in
        the browser, so none of it is in the first HTML. It is only allowed in
        Client Components; in a Server Component the build fails.
      </p>
    ),
  },
  {
    question: "Do Server Components need dynamic imports for code splitting?",
    answer: (
      <p>
        No. Server Components are automatically code split and never ship to the
        browser as JavaScript. <code>dynamic()</code> is for Client Components
        and client-side libraries.
      </p>
    ),
  },
  {
    question: "When is a dynamic import a bad idea?",
    answer: (
      <p>
        For small components, for content above the fold, and for anything that
        must be in the server HTML for SEO. It adds a request and a loading
        state without a meaningful bundle saving.
      </p>
    ),
  },
  {
    question: "How would you load a heavy library only when the user clicks?",
    answer: (
      <p>
        Either render a <code>dynamic()</code> component on click, or call{" "}
        <code>await import(&quot;library&quot;)</code> in the click handler. The
        bundler puts the library in its own chunk fetched on first use.
      </p>
    ),
  },
];
