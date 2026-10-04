import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoHref = "/errors/actions-and-handlers/demo";

export const basics = (
  <>
    <p>
      Nothing catches an uncaught throw in a Route Handler or Server Action for
      you the way an error boundary catches a render error. Handle both kinds of
      failure on purpose:
    </p>
    <ul>
      <li>
        <strong>Expected failures</strong> (validation, a business rule saying
        no) are part of the contract. Return them: a Route Handler answers a 4xx
        with a stable <code>{"{ code, message }"}</code>; a Server Action returns
        typed state that <code>useActionState</code> renders.
      </li>
      <li>
        <strong>Unexpected failures</strong> (a database that is down) are bugs
        or outages. Report them, show a generic message, and never put the cause
        in the response.
      </li>
    </ul>
    <p>
      The <Link href={demoHref}>demo</Link> calls a Route Handler in four modes
      and a Server Action in three. Observed on a production build:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Mode</th>
          <th scope="col">Route Handler</th>
          <th scope="col">Server Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ok</td>
          <td>200 with the reservation</td>
          <td>state: reserved</td>
        </tr>
        <tr>
          <td>expected</td>
          <td>409 with code out_of_stock</td>
          <td>state: refused (returned, not thrown)</td>
        </tr>
        <tr>
          <td>unexpected</td>
          <td>
            500 with a generic message and a reference id (caught, reported)
          </td>
          <td>thrown: the error boundary shows a masked message and a digest</td>
        </tr>
        <tr>
          <td>uncaught</td>
          <td>bare 500 with an empty body (nothing caught it)</td>
          <td>(same as unexpected)</td>
        </tr>
      </tbody>
    </table>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Nothing leaks, in either direction.</strong> The failure message
      was <em>&quot;connect ECONNREFUSED 10.0.0.12:5432&quot;</em>; no response
      body contained it. The caller got a reference id, and the same id sits in
      the server log next to the full error, so support can find the cause.
    </li>
    <li>
      <strong>Catching means you must report.</strong> The &quot;unexpected&quot;
      handler path swallows the error into a 500 response, so it calls the
      reporting helper itself. Uncaught errors are different:{" "}
      <code>instrumentation.ts</code> exports{" "}
      <code>onRequestError = Sentry.captureRequestError</code>, so Next.js
      reports them centrally. Do not catch an error only to log it, or you hide
      it from that hook.
    </li>
    <li>
      <strong>Report only the unexpected.</strong> A 409 or a validation error
      is normal traffic. Sending it to the monitor buries the real problems.
      Reporting also never throws: a failure to report is logged and dropped so
      it cannot mask the original error.
    </li>
    <li>
      <strong>A thrown action error reaches an error boundary.</strong> The
      action that threw was caught by the demo segment&apos;s{" "}
      <code>error.tsx</code>, which received a generic message and a{" "}
      <code>digest</code>. Return expected failures instead of throwing them, or
      users lose the form to a fallback screen.
    </li>
    <li>
      <strong>An uncaught handler throw has no useful body.</strong> The 500 had
      an empty body and no code, so a client cannot tell what happened. Wrap
      the work and return the structured shape.
    </li>
    <li>
      <strong>Model expected errors in types.</strong> The result type is a
      discriminated union (<code>ok: true</code> or a reason), so callers cannot
      forget to handle the failure, and an exhaustive <code>switch</code> breaks
      the build if a case is missing.
    </li>
    <li>
      <strong>
        <code>redirect()</code> and <code>notFound()</code> are exceptions.
      </strong>{" "}
      Inside a <code>try</code> they get caught like any error; call them
      outside the block or rethrow with <code>unstable_rethrow</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is the difference between an expected and an unexpected error?",
    answer: (
      <p>
        An expected error is part of the contract (invalid input, out of stock):
        return it as a typed value or a 4xx so callers can act. An unexpected
        one (a dependency down, a bug) throws, is reported, and surfaces as a
        generic failure.
      </p>
    ),
  },
  {
    question: "How should a Route Handler respond to an unexpected error?",
    answer: (
      <p>
        With a 500 and a stable body such as{" "}
        <code>{"{ code: \"internal_error\", message, reference }"}</code>: no
        stack trace, no internal text. Log the full error with the reference
        and report it.
      </p>
    ),
  },
  {
    question: "Where do errors from Server Actions go?",
    answer: (
      <p>
        Expected ones you return as state. An uncaught throw propagates to the
        nearest error boundary (with a masked message and digest) and is
        reported by the request error hook. They are never caught by anything
        automatically in between.
      </p>
    ),
  },
  {
    question: "Why not log the error in a catch block and carry on?",
    answer: (
      <p>
        Because it hides the failure from the central reporting hook and from
        callers. Catch only when you can recover, translate it, or must produce
        a response, and when you swallow it, report it.
      </p>
    ),
  },
  {
    question: "What happens with an uncaught throw in a Route Handler?",
    answer: (
      <p>
        Next.js responds with a bare 500 (empty body in the demo), logs the
        error, and reports it through <code>onRequestError</code>. It does not
        reach any error boundary.
      </p>
    ),
  },
  {
    question: "What should an error response never contain?",
    answer: (
      <p>
        Stack traces, file paths, raw database messages, or any internal
        identifier. Return a code, a human-readable message, and a reference id
        that lets you find the details in your own logs.
      </p>
    ),
  },
];
