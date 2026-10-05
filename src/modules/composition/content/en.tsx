import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/components/composition/demo";

export const basics = (
  <>
    <p>
      Server and Client Components nest in either direction, but the{" "}
      <em>import</em> graph and the <em>render</em> tree are different things.
      A Client Component cannot import a Server Component (importing it makes
      it client code), but it can <strong>receive</strong> one as{" "}
      <code>children</code> (or any other prop) from a Server Component above
      it.
    </p>
    <CodeBlock code={`// Server Component: owns the composition
<Collapsible title="...">      // "use client", has state
  <ServerFactsPanel />         // Server Component, rendered first
</Collapsible>`} />
    <p>
      The server renders <code>ServerFactsPanel</code> first and hands the
      result to <code>Collapsible</code> as already-rendered output. The
      client never receives the Server Component&apos;s code, only its output.
      That is the <em>interleaving</em> pattern: keep interactive wrappers
      (modals, tabs, providers) as small Client Components and pass the heavy
      content through <code>children</code>.
    </p>
    <p>
      Try the <LocalizedLink href={demoHref}>demo</LocalizedLink>. Hide and show the panel: the
      server timestamp inside it does not change, because toggling is client
      state and the content was rendered once on the server.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Importing a Server Component into a client file converts it.</strong>{" "}
      The module is pulled into the client graph, loses server-only
      capabilities, and is bundled for the browser. Pass it as{" "}
      <code>children</code> from a Server Component instead.
    </li>
    <li>
      <strong>
        <code>server-only</code> turns that mistake into a build error.
      </strong>{" "}
      Importing a module that starts with <code>import &quot;server-only&quot;</code>{" "}
      from a Client Component fails with{" "}
      <em>&quot;&apos;server-only&apos; cannot be imported from a Client
      Component module&quot;</em>. Use it for data access and anything that
      reads secrets.
    </li>
    <li>
      <strong>Check the bundle, not just the UI.</strong> The server-only
      module&apos;s marker string appears in the rendered output but in none
      of the client JavaScript chunks, which is what &quot;the code stays on
      the server&quot; means.
    </li>
    <li>
      <strong>Render providers as deep as possible.</strong> Wrap only{" "}
      <code>children</code> in a client provider, not the whole{" "}
      <code>&lt;html&gt;</code>, so the static parts of the tree stay
      optimizable.
    </li>
    <li>
      <strong>Props that carry JSX still obey serialization.</strong> A
      rendered element is fine; a render function (<code>{"render={() => <X />}"}</code>)
      is a function and cannot cross.
    </li>
    <li>
      <strong>Per-request children need <code>&lt;Suspense&gt;</code>.</strong>{" "}
      Under Cache Components, a Server Component that reads runtime data
      (here, <code>connection()</code>) must sit behind a boundary, even when
      it is nested inside a client wrapper.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Can a Client Component render a Server Component?",
    answer: (
      <p>
        Not by importing it: that turns the imported module into client code.
        But a Server Component can pass another Server Component to a Client
        Component as <code>children</code> (or any prop). The server renders it
        first and the client only places the output.
      </p>
    ),
  },
  {
    question: "Why does toggling a Client Component's children not refetch anything?",
    answer: (
      <p>
        The children are rendered on the server before the Client Component
        runs, and arrive as serialized output. The client state only decides
        whether to show them. Nothing is re-rendered on the server, which the
        demo&apos;s unchanging timestamp shows.
      </p>
    ),
  },
  {
    question: "What does the server-only package do?",
    answer: (
      <p>
        Importing it makes a module unusable from the client graph: if a
        Client Component (directly or transitively) imports that module, the
        build fails. It protects secrets and data-access code from silently
        landing in a browser bundle.
      </p>
    ),
  },
  {
    question: "Where should context providers go in the App Router?",
    answer: (
      <p>
        In a small Client Component that accepts <code>children</code>, placed
        as deep as practical. The root layout (a Server Component) renders the
        provider around <code>{"{children}"}</code> so only what needs context
        is client code.
      </p>
    ),
  },
  {
    question: "What is the interleaving pattern?",
    answer: (
      <p>
        Nesting Server Components inside Client Components through props,
        composed in a Server Component. It keeps interactive wrappers small
        while the content they wrap stays on the server and out of the client
        bundle.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Composition",
  summary: "Passing Client Components as children to Server Components.",
  basics,
  edgeCases,
  interviewQuestions,
};
