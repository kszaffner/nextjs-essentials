import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoHref = "/data/parallel-vs-sequential/demo";

export const basics = (
  <>
    <p>
      A <strong>waterfall</strong> is a chain of requests where each starts only
      after the previous one finished. When the requests are independent, that
      wastes time: the total becomes the <em>sum</em> of the delays instead of
      the <em>longest</em> one. On the server it is easy to create one without
      noticing.
    </p>
    <p>
      The <Link href={demoHref}>demo</Link> simulates requests that take 600 ms
      each and measures the real elapsed time on the server:
    </p>
    <ul>
      <li>
        <strong>Sequential awaits</strong> in one component: three requests
        take about <strong>1800 ms</strong>.
      </li>
      <li>
        <strong><code>Promise.all</code></strong>: the same three take about{" "}
        <strong>600 ms</strong>.
      </li>
      <li>
        <strong>Nested components</strong> that each fetch before rendering the
        next: about <strong>1800 ms</strong>, a waterfall hidden in the tree.
      </li>
      <li>
        <strong>Sibling components</strong> that each fetch behind their own
        Suspense boundary: each resolves at about <strong>600 ms</strong>.
      </li>
      <li>
        <strong>A promise passed to a Client Component</strong> and read with{" "}
        <code>use()</code>: the server starts it and does not block on it.
      </li>
    </ul>
    <p>
      The rule: start independent requests together, and only chain requests
      that genuinely depend on each other&apos;s result.
    </p>
    <pre>
      <code>{`// Start early, await later (preload pattern)
const itemPromise = getItem(id);       // starts now
const user = await getUser();          // runs meanwhile
const item = await itemPromise;`}</code>
    </pre>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Components can hide a waterfall.</strong> A child component can
      only start its own fetch once its parent has rendered it, and the parent
      renders it only after its own <code>await</code>. Move independent
      fetches up to a common parent and start them together, or make the
      components siblings.
    </li>
    <li>
      <strong>Dependent requests are not a bug.</strong> If the second request
      needs the first one&apos;s result (a user id to fetch their orders), they
      must be sequential. Reduce the dependency (pass the id earlier, let the
      backend join the data) rather than forcing parallelism.
    </li>
    <li>
      <strong>
        <code>Promise.all</code> rejects on the first failure.
      </strong>{" "}
      One failed request rejects the whole group. Use{" "}
      <code>Promise.allSettled</code> when partial results are acceptable.
    </li>
    <li>
      <strong>Parallel does not mean fewer requests.</strong> Two sibling
      components asking for the same data would both fetch it. Identical{" "}
      <code>GET</code> fetches are memoized within a render, and other loaders
      can be wrapped in <code>React.cache</code>, so the work runs once.
    </li>
    <li>
      <strong>Boundaries decide when parts appear.</strong> Siblings in
      separate <code>&lt;Suspense&gt;</code> boundaries reveal as they resolve;
      siblings in one boundary reveal together once the slowest is done (see
      the streaming topic).
    </li>
    <li>
      <strong>
        <code>use()</code> needs a promise created on the server.
      </strong>{" "}
      A promise created while a Client Component renders is recreated on every
      render. Create it in a Server Component, pass it down, and wrap the
      reader in <code>&lt;Suspense&gt;</code>.
    </li>
    <li>
      <strong>Under Cache Components, uncached requests need a boundary.</strong>{" "}
      The demo&apos;s sections run after <code>connection()</code> inside
      Suspense. Cached requests can instead complete during the build and
      disappear into the static shell.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is the waterfall problem?",
    answer: (
      <p>
        Independent requests running one after another, so the total time is
        the sum of the delays instead of the longest. In the demo, three 600 ms
        requests take about 1800 ms in sequence and about 600 ms in parallel.
      </p>
    ),
  },
  {
    question: "How do you fetch in parallel in a Server Component?",
    answer: (
      <p>
        Start the requests together and await them as a group with{" "}
        <code>Promise.all</code>, or split them into sibling components that
        each fetch their own data (ideally behind their own Suspense boundary).
        You can also start a promise early and await it later.
      </p>
    ),
  },
  {
    question: "How can nested components cause a waterfall?",
    answer: (
      <p>
        A child renders only after its parent finishes its <code>await</code>,
        so if each level fetches before rendering the next, the requests chain.
        The demo&apos;s three nested levels take about 1800 ms even though the
        requests are independent.
      </p>
    ),
  },
  {
    question: "Promise.all or Promise.allSettled?",
    answer: (
      <p>
        <code>Promise.all</code> fails as soon as one promise rejects, which is
        right when you need every result. <code>Promise.allSettled</code>{" "}
        returns every outcome, which is right when the page can render with
        partial data.
      </p>
    ),
  },
  {
    question: "How does use() help with data fetching?",
    answer: (
      <p>
        A Server Component can start a request and pass the promise to a Client
        Component, which reads it with <code>use()</code> behind Suspense. The
        server does not block on the data, and the client component suspends
        until it resolves.
      </p>
    ),
  },
  {
    question: "When is sequential fetching correct?",
    answer: (
      <p>
        When a request depends on the result of a previous one. Then the chain
        is inherent; the way to speed it up is to remove the dependency or move
        the join to the backend.
      </p>
    ),
  },
];
