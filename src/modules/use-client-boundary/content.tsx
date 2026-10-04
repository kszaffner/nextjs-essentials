import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/components/use-client-boundary/demo";

export const basics = (
  <>
    <p>
      In the App Router every component is a <strong>Server Component</strong>{" "}
      unless a module opts out. Adding <code>&quot;use client&quot;</code> at
      the top of a file marks it as an <em>entry point</em> of the client
      module graph: that file, and everything it imports, is bundled for the
      browser. It does not mean &quot;runs only in the browser&quot;: Client
      Components are still prerendered to HTML on the server, then hydrated.
    </p>
    <p>
      The directive draws a line, and what crosses it is{" "}
      <strong>serialized</strong> into the RSC payload:
    </p>
    <ul>
      <li>
        Allowed: strings, numbers, <code>bigint</code>, booleans,{" "}
        <code>undefined</code>, <code>null</code>, <code>Date</code>,{" "}
        <code>Map</code>, <code>Set</code>, arrays, plain objects, rendered
        JSX (such as <code>children</code>), Promises, and Server Actions.
      </li>
      <li>
        Not allowed: ordinary functions (including event handlers), class
        instances, and objects with a null prototype.
      </li>
    </ul>
    <p>
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> sends one of each allowed kind
      from a Server Component. The Client Component prints what it received:
      a <code>Date</code> is still a <code>Date</code>, a <code>Map</code> is
      still a <code>Map</code>.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>A function prop fails the build.</strong> Passing{" "}
      <code>callback={"{() => 1}"}</code> from a Server Component gives:{" "}
      <em>
        &quot;Functions cannot be passed directly to Client Components unless
        you explicitly expose it by marking it with &quot;use server&quot;.&quot;
      </em>{" "}
      An event handler gives the sibling error{" "}
      <em>&quot;Event handlers cannot be passed to Client Component
      props.&quot;</em>
    </li>
    <li>
      <strong>A class instance fails the build.</strong>{" "}
      <em>
        &quot;Only plain objects, and a few built-ins, can be passed to Client
        Components from Server Components. Classes or null prototypes are not
        supported.&quot;</em>{" "}
      Convert it to a plain object first (and rebuild the class on the client
      if you need its methods).
    </li>
    <li>
      <strong>The directive is per module graph, not per file.</strong> A
      component imported by a <code>&quot;use client&quot;</code> file becomes
      part of the client bundle even without its own directive, so put the
      directive on the smallest entry point you can.
    </li>
    <li>
      <strong>Everything you pass is sent to the browser.</strong> A prop
      becomes part of the page payload, visible in the network tab. Pass the
      fields the UI needs, not a whole database row.
    </li>
    <li>
      <strong>Client Components still render on the server first.</strong>{" "}
      Browser-only APIs such as <code>window</code> are unavailable during
      that pass, so guard them or read them after hydration.
    </li>
    <li>
      <strong>An <code>undefined</code> object property loses its key.</strong>{" "}
      The value crosses fine (the payload carries <code>$undefined</code>),
      but inside an object the key itself is gone on arrival:{" "}
      <code>&quot;nothing&quot; in values</code> is <code>false</code>, while{" "}
      <code>values.nothing</code> still reads <code>undefined</code>. The demo
      marks that row.
    </li>
    <li>
      <strong>Props are a snapshot.</strong> The value is serialized at render
      time; a <code>Date</code> or <code>Map</code> that arrives on the client
      is a copy, not a shared reference.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What does \"use client\" actually do?",
    answer: (
      <p>
        It marks a module as an entry point of the client module graph. The
        module and everything it imports ship to the browser and hydrate
        there. Components are still prerendered to HTML on the server; the
        directive does not mean &quot;browser only&quot;.
      </p>
    ),
  },
  {
    question: "What can be passed as props from a Server Component to a Client Component?",
    answer: (
      <p>
        Anything React can serialize: primitives (including{" "}
        <code>bigint</code>), <code>Date</code>, <code>Map</code>,{" "}
        <code>Set</code>, arrays, plain objects, JSX, Promises, and Server
        Actions. Ordinary functions, class instances, and null-prototype
        objects cannot cross the boundary.
      </p>
    ),
  },
  {
    question: "Why can't you pass an onClick handler from a Server Component?",
    answer: (
      <p>
        A function would have to be serialized into the payload, and
        arbitrary functions are not serializable. Move the interactive part
        into a Client Component that defines the handler itself. The only
        functions that can cross are Server Actions (<code>&quot;use
        server&quot;</code>), which cross as references.
      </p>
    ),
  },
  {
    question: "Does a component imported into a \"use client\" file need its own directive?",
    answer: (
      <p>
        No. Importing it from a client entry point pulls it into the client
        bundle. That is why you should keep the directive low in the tree: a
        directive on a layout would make the whole subtree client code.
      </p>
    ),
  },
  {
    question: "Is a Client Component rendered only in the browser?",
    answer: (
      <p>
        No. It is prerendered to HTML on the server and then hydrated. Code
        that touches <code>window</code> or <code>document</code> during
        render breaks that first pass.
      </p>
    ),
  },
];
