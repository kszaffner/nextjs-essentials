import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoHref = "/server-actions/basics/demo";

export const basics = (
  <>
    <p>
      A <strong>Server Function</strong> is an async function that runs on the
      server and is called from the client through a network request. Used for
      mutations (a form action, a button&apos;s <code>formAction</code>, or a
      handler inside a transition) it is called a <strong>Server Action</strong>.
      Two ways to define one:
    </p>
    <ul>
      <li>
        <strong>Inline</strong>, with <code>&quot;use server&quot;</code> as the
        first line of an async function inside a <em>Server</em> Component.
      </li>
      <li>
        <strong>In a module</strong>, with <code>&quot;use server&quot;</code> at
        the top of the file. This is the only way to give a{" "}
        <em>Client</em> Component an action: it imports it.
      </li>
    </ul>
    <p>
      Behind the scenes an action is an HTTP <code>POST</code>, and only POST
      can invoke it. When it runs, Next.js can return the updated UI and the
      new data in a single round trip.
    </p>
    <p>
      The <Link href={demoHref}>demo</Link> has an inline action behind a plain
      form, and an imported action called from a click handler. Both bump a
      server counter that takes 600 ms to update, then refresh the page.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>An action is a public endpoint.</strong> Anyone can POST to it
      directly, not just through your UI (the demo&apos;s no-JS checks did
      exactly that with <code>curl</code>). Authenticate and authorize inside
      every action; a hidden or disabled button is not protection.
    </li>
    <li>
      <strong>Everything the client sends is untrusted, bound arguments
      included.</strong> A value bound with <code>.bind(null, &quot;guest&quot;)</code>{" "}
      appears in plain text in the page&apos;s HTML (<code>[&quot;guest&quot;]</code>).
      Replacing it with <code>[&quot;vip&quot;]</code> in the POST was accepted;{" "}
      <code>[&quot;admin&quot;]</code> was rejected only because the action
      parsed it against an enum. Parse every argument with a schema.
    </li>
    <li>
      <strong>Cross-site requests are rejected.</strong> Next.js compares the{" "}
      <code>Origin</code> header with the host. A POST with a foreign{" "}
      <code>Origin</code> was refused (an HTTP 500 in this version), a
      same-origin one went through. Behind a reverse proxy, list your domains
      in <code>serverActions.allowedOrigins</code>.
    </li>
    <li>
      <strong>Calls are dispatched one at a time.</strong> Three calls fired
      together in the demo returned after about 629, 1246, and 1861 ms: each
      waits for the previous one. Actions are for mutations, not for parallel
      data loading (see the fetching topic).
    </li>
    <li>
      <strong>A client file cannot declare an action inline.</strong> Putting{" "}
      <code>&quot;use server&quot;</code> in a function inside a{" "}
      <code>&quot;use client&quot;</code> file fails the build with the
      misleading <em>&quot;The &quot;use client&quot; directive must be placed
      before other expressions.&quot;</em> Move the action to a{" "}
      <code>&quot;use server&quot;</code> file.
    </li>
    <li>
      <strong>A &quot;use server&quot; file exports only async functions.</strong>{" "}
      A constant fails with{" "}
      <em>&quot;Only async functions are allowed to be exported in a &quot;use
      server&quot; file.&quot;</em> Keep types and constants in a separate
      file.
    </li>
    <li>
      <strong>Closures are encrypted, not secret.</strong> Variables an inline
      action captures are encrypted before they reach the client, and action
      IDs are encrypted with unused actions stripped from client bundles. Do
      not capture secrets anyway. Self-hosted multi-instance deployments need a
      stable <code>NEXT_SERVER_ACTIONS_ENCRYPTION_KEY</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is the difference between a Server Function and a Server Action?",
    answer: (
      <p>
        A Server Function is any async function that runs on the server and is
        called from the client over the network. A Server Action is a Server
        Function used for a mutation: passed to a form&apos;s <code>action</code>,
        a button&apos;s <code>formAction</code>, or called in a transition.
      </p>
    ),
  },
  {
    question: "Where can you define a Server Action?",
    answer: (
      <p>
        Inline in a Server Component (<code>&quot;use server&quot;</code> in the
        function body), or in a file marked <code>&quot;use server&quot;</code>.
        Client Components cannot define one inline; they import an action from
        a <code>&quot;use server&quot;</code> file.
      </p>
    ),
  },
  {
    question: "Are Server Actions secure by default?",
    answer: (
      <p>
        Partly: they are POST only, check <code>Origin</code> against the host,
        encrypt action IDs and closure variables, and strip unused actions from
        client bundles. They remain public endpoints, so you must still
        authenticate, authorize, and validate input inside each one.
      </p>
    ),
  },
  {
    question: "Why not use Server Actions to fetch data?",
    answer: (
      <p>
        They are dispatched one at a time per client and use POST, so parallel
        reads would queue behind each other and nothing is cached. Fetch in
        Server Components (or Route Handlers); use actions to change data.
      </p>
    ),
  },
  {
    question: "Why must you validate bound arguments?",
    answer: (
      <p>
        Bound arguments travel with the request and appear in the page&apos;s
        HTML, so a caller can change them. Treat them like form fields: parse
        them with a schema, and never let a bound value decide authorization.
      </p>
    ),
  },
  {
    question: "What does an action return to the client?",
    answer: (
      <p>
        A serializable value, plus (when it revalidates or refreshes) the
        updated UI in the same response. Expected failures are best returned as
        data; thrown errors reach an error boundary.
      </p>
    ),
  },
];
