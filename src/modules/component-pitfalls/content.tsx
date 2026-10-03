import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoHref = "/components/pitfalls/demo";

export const basics = (
  <>
    <p>
      Server Components are the default. Reach for a Client Component only for
      what a server cannot do:
    </p>
    <ul>
      <li>
        <strong>Server Component</strong>: fetch data, read secrets, talk to
        a database, keep large dependencies out of the browser.
      </li>
      <li>
        <strong>Client Component</strong>: state, effects, event handlers,
        browser APIs (<code>window</code>, <code>localStorage</code>), and
        libraries that need them.
      </li>
    </ul>
    <p>
      Most mistakes come from forgetting which side a file is on. The{" "}
      <Link href={demoHref}>demo</Link> contrasts the two ways to build the
      same card: a <strong>client leaf</strong> (only the button is client
      code) and <strong>everything client</strong> (the directive on the whole
      card). Both look identical; the difference is in the JavaScript bundle,
      where the second card&apos;s static text ships to every visitor and the
      first card&apos;s does not.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Event handler in a Server Component.</strong> An{" "}
      <code>onClick</code> on a plain element in a Server Component fails the
      build:{" "}
      <em>&quot;Event handlers cannot be passed to Client Component
      props.&quot;</em>{" "}
      Extract the interactive element into a small Client Component.
    </li>
    <li>
      <strong>A hook in a Server Component.</strong> Importing{" "}
      <code>useState</code> there fails:{" "}
      <em>
        &quot;You&apos;re importing a module that depends on `useState` into a
        React Server Component module. This API is only available in Client
        Components. To fix, mark the file (or its parent) with the
        `&quot;use client&quot;` directive.&quot;
      </em>
    </li>
    <li>
      <strong>A browser API in a Server Component.</strong>{" "}
      <code>window.innerWidth</code> during prerendering throws{" "}
      <em>ReferenceError: window is not defined</em>. The same code in a
      Client Component also runs once on the server, so guard it or read it
      after hydration.
    </li>
    <li>
      <strong>The directive too high in the tree.</strong> Marking a layout or
      page <code>&quot;use client&quot;</code> makes everything it imports
      client code, and the whole subtree ships as JavaScript. Push the
      directive down to the interactive leaf.
    </li>
    <li>
      <strong>Non-deterministic values while prerendering.</strong> Under
      Cache Components, <code>new Date()</code> or <code>Math.random()</code>{" "}
      in a Server Component fails the build:{" "}
      <em>
        &quot;Next.js encountered the unstable value `Math.random()` while
        prerendering.&quot;
      </em>{" "}
      Read request-time data after <code>connection()</code> inside{" "}
      <code>&lt;Suspense&gt;</code>, or cache the value with{" "}
      <code>&quot;use cache&quot;</code>.
    </li>
    <li>
      <strong>Secrets reaching the client.</strong> Only{" "}
      <code>NEXT_PUBLIC_</code> variables are inlined into the client bundle;
      other variables become empty strings there. Mark data-access modules{" "}
      <code>server-only</code> so importing them from the client fails at
      build time instead.
    </li>
    <li>
      <strong>Passing the wrong thing across the boundary.</strong> Functions
      and class instances cannot be props (see{" "}
      <Link href="/components/use-client-boundary">the use client boundary</Link>
      ).
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Why are components Server Components by default?",
    answer: (
      <p>
        Because most UI does not need interactivity, and a Server Component
        ships no JavaScript for itself, can read data and secrets directly,
        and keeps heavy dependencies out of the browser. You opt into the
        client only where state, effects, or browser APIs are needed.
      </p>
    ),
  },
  {
    question: "What happens if you use useState or onClick in a Server Component?",
    answer: (
      <p>
        The build fails with an explicit error: hooks give &quot;This API is
        only available in Client Components&quot;, and event handlers give
        &quot;Event handlers cannot be passed to Client Component props&quot;.
        Fix it by moving the interactive part into a Client Component.
      </p>
    ),
  },
  {
    question: "Where should you put \"use client\", and why does it matter?",
    answer: (
      <p>
        On the smallest interactive leaf. The directive applies to the whole
        module graph below it, so a directive on a page or layout ships all of
        that subtree&apos;s code to the browser. In the demo, the text in the
        &quot;everything client&quot; card appears in the client chunks; the
        leaf card&apos;s text does not.
      </p>
    ),
  },
  {
    question: "Why does new Date() fail in a Server Component here?",
    answer: (
      <p>
        With Cache Components, a component is prerendered into a static shell
        by default, and the current time or a random number would be frozen at
        build time. Next.js refuses that: read such values at request time
        (after <code>connection()</code>, inside <code>&lt;Suspense&gt;</code>)
        or cache them deliberately.
      </p>
    ),
  },
  {
    question: "How do you keep secrets and server-only code out of the client?",
    answer: (
      <p>
        Do not prefix secrets with <code>NEXT_PUBLIC_</code> (unprefixed
        variables are empty in the client bundle) and import{" "}
        <code>server-only</code> in data-access modules so a client import
        fails the build.
      </p>
    ),
  },
];
