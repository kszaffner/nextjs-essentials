import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/server-actions/forms/demo";

export const basics = (
  <>
    <p>
      React lets a <code>&lt;form&gt;</code> take a function as its{" "}
      <code>action</code>. Pass a Server Action and the function receives the
      form&apos;s <code>FormData</code>:
    </p>
    <pre>
      <code>{`async function addGuest(role: string, formData: FormData) {
  "use server";
  const name = formData.get("name");   // string | File | null
  // parse, then mutate
}

<form action={addGuest.bind(null, "guest")}>
  <input name="name" />
  <button>Add</button>
  <button formAction={clearGuests}>Clear</button>
</form>`}</code>
    </pre>
    <ul>
      <li>
        <code>formData.get(name)</code> returns a string, a <code>File</code>,
        or <code>null</code>; parse it before use.
      </li>
      <li>
        <code>.bind(null, value)</code> passes extra arguments that are not
        form fields; they arrive before the <code>FormData</code>.
      </li>
      <li>
        <code>formAction</code> on a button gives the same form a second
        action.
      </li>
    </ul>
    <p>
      <strong>Progressive enhancement.</strong> A form whose action is a Server
      Action works before React hydrates, and without JavaScript. The server
      renders it as <code>method=&quot;POST&quot;</code> with{" "}
      <code>encType=&quot;multipart/form-data&quot;</code> plus hidden{" "}
      <code>$ACTION_*</code> fields that identify the action. The{" "}
      <LocalizedLink href={demoHref}>demo</LocalizedLink> is such a form; when a plain POST
      (what a browser without JavaScript sends) was replayed with{" "}
      <code>curl</code>, the response was HTTP 200 with the updated list
      already in the HTML.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>A wrapping function breaks the no-JS path.</strong> Passing your
      own function to <code>action</code> (to add client logic first) renders
      the form as{" "}
      <code>action=&quot;javascript:throw new Error(&apos;React form
      unexpectedly submitted.&apos;)&quot;</code>: submitted before hydration
      or without JavaScript, it does not work. Pass the Server Action (or the{" "}
      <code>formAction</code> from <code>useActionState</code>) directly when
      you need progressive enhancement.
    </li>
    <li>
      <strong>Hidden fields and bound arguments are editable.</strong> Both are
      visible in the HTML and can be changed in the POST. The demo accepted a
      tampered role and rejected one outside the allowed values only because
      the action parsed it.
    </li>
    <li>
      <strong>HTML validation is UX, not security.</strong>{" "}
      <code>required</code> and <code>maxLength</code> stop honest mistakes; a
      31-character name posted directly was rejected only by the server-side
      schema. Validate in the action.
    </li>
    <li>
      <strong>The form resets after the action.</strong> Uncontrolled fields
      are cleared once an action finishes, even when it failed, so refill from
      returned values if the user may need to retry (next topics).
    </li>
    <li>
      <strong>You cannot change the method or encoding.</strong> With a
      function action, React submits <code>POST</code> as multipart form data;
      a <code>method</code> or <code>encType</code> you set is ignored.
    </li>
    <li>
      <strong>A second action per form needs <code>formAction</code> on a
      button.</strong> Remember <code>formNoValidate</code> on a button such as
      &quot;Clear&quot; that should not be blocked by required fields.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How does <form action={serverAction}> work?",
    answer: (
      <p>
        React extends <code>&lt;form&gt;</code> so its <code>action</code> can be
        a function. A Server Action receives the <code>FormData</code>; React
        submits it with <code>fetch</code> once hydrated, and Next.js returns
        the new UI and data in the response.
      </p>
    ),
  },
  {
    question: "What is progressive enhancement, and how does it apply here?",
    answer: (
      <p>
        The form works without client JavaScript: the server renders a real{" "}
        <code>POST</code> form with hidden fields identifying the action, so a
        browser can submit it before hydration or with scripts disabled. With
        JavaScript, the same form upgrades to an in-page submission.
      </p>
    ),
  },
  {
    question: "How do you pass extra data to an action besides form fields?",
    answer: (
      <p>
        Use <code>.bind(null, value)</code>, a hidden input, or an inline
        action&apos;s closure. All of them reach the server through the
        request, so treat them as untrusted input: parse them, and never base
        authorization on them.
      </p>
    ),
  },
  {
    question: "How do you attach more than one action to a form?",
    answer: (
      <p>
        Put <code>formAction={"{otherAction}"}</code> on a submit button. The
        button&apos;s action replaces the form&apos;s for that submission.
      </p>
    ),
  },
  {
    question: "If the inputs have required and maxLength, why validate on the server?",
    answer: (
      <p>
        Those checks run in the browser, so anyone can bypass them with a
        direct request. The server is the only place that can enforce the
        rules, so the action must parse the input itself.
      </p>
    ),
  },
  {
    question: "Why can a wrapped action break the form without JavaScript?",
    answer: (
      <p>
        A function you write exists only in the client bundle, so the
        server-rendered form has nothing to POST to. Next.js renders a
        placeholder action that throws if the form is submitted before
        hydration.
      </p>
    ),
  },
];
