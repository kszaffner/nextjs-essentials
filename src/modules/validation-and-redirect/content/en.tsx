import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/server-actions/validation-and-redirect/demo";

export const basics = (
  <>
    <p>
      An action is the trust boundary, so it parses its input first.{" "}
      <code>FormData</code> values are strings, so the schema also coerces them:
    </p>
    <CodeBlock code={`const parsed = SignupSchema.safeParse(values);
if (!parsed.success) {
  return { status: "invalid", fieldErrors, values };  // data, not a throw
}
// ...create the account...
redirect(\`/welcome?name=\${encodeURIComponent(parsed.data.name)}\`);`} />
    <ul>
      <li>
        <strong>Validate with a schema</strong> (Zod) and return errors per
        field as state; <code>useActionState</code> renders them.
      </li>
      <li>
        <strong>Redirect after success</strong> with <code>redirect()</code>:
        it throws a special error that Next.js turns into a navigation.
      </li>
      <li>
        <strong>HTML attributes</strong> (<code>required</code>,{" "}
        <code>type=&quot;email&quot;</code>) are a convenience on top, never the
        defense.
      </li>
    </ul>
    <p>
      Try the <LocalizedLink href={demoHref}>demo</LocalizedLink>; the second button skips the
      browser&apos;s own checks so you can see the server&apos;s. Observed:
      an invalid submission returned three field errors; a valid one went to the
      welcome page. Without JavaScript, a valid POST got{" "}
      <code>303 See Other</code> with a <code>Location</code> header, and an
      invalid one got HTTP 200 with the errors already in the HTML.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>redirect()</code> must stay out of <code>try/catch</code>.
      </strong>{" "}
      It works by throwing, so a surrounding <code>catch</code> swallows the
      redirect. Call it after the block, or rethrow with{" "}
      <code>unstable_rethrow(error)</code>, which also lets{" "}
      <code>notFound()</code> through.
    </li>
    <li>
      <strong>Coercion hides mistakes.</strong> <code>Number(&quot;&quot;)</code>{" "}
      is <code>0</code>, so an empty age would pass a minimum-of-zero rule.
      The schema requires non-empty text before converting, and gives{" "}
      <code>abc</code> its own message instead of a generic one.
    </li>
    <li>
      <strong>Refill what the user typed.</strong> Fields reset after the
      action, so the demo returns <code>values</code> and sets{" "}
      <code>defaultValue</code>; the comment field deliberately does not, and
      comes back empty. Never send a password back.
    </li>
    <li>
      <strong>Return expected errors, throw unexpected ones.</strong>{" "}
      Validation failures are state the form renders; an unreachable database
      should throw so error handling and monitoring see it.
    </li>
    <li>
      <strong>Build redirect URLs safely.</strong> The name is passed through{" "}
      <code>encodeURIComponent</code>. Never redirect to a URL taken from the
      request without checking it against an allow-list (open redirect).
    </li>
    <li>
      <strong>Query values are user input too.</strong> The welcome page takes
      one value, bounds its length, and lets React escape it: a name of{" "}
      <code>Grace &lt;b&gt;Hopper&lt;/b&gt;</code> was shown as text, with no
      element injected.
    </li>
    <li>
      <strong>Previous state is client-controlled without JavaScript.</strong>{" "}
      A no-JS form carries the previous state in a hidden field. Never base
      authorization on it.
    </li>
    <li>
      <strong>Redirect type and status.</strong> In a Server Action{" "}
      <code>redirect</code> pushes a history entry (<code>replace</code>{" "}
      elsewhere); use <code>permanentRedirect</code> for a permanent move.
      Without JavaScript the observed response was <code>303</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How do you validate form input in a Server Action?",
    answer: (
      <p>
        Read the <code>FormData</code>, parse it with a schema (Zod&apos;s{" "}
        <code>safeParse</code>), and return field errors as state when it fails.
        Do it on the server even when the form has HTML validation, because
        the request can bypass the browser.
      </p>
    ),
  },
  {
    question: "Why does redirect() not work inside try/catch?",
    answer: (
      <p>
        <code>redirect()</code> throws a <code>NEXT_REDIRECT</code> error that
        the framework catches to navigate. A <code>catch</code> block would
        swallow it. Call it outside the block, or rethrow Next.js errors with{" "}
        <code>unstable_rethrow</code>.
      </p>
    ),
  },
  {
    question: "What happens on redirect with and without JavaScript?",
    answer: (
      <p>
        With JavaScript it is a client-side navigation. Without it, the POST
        gets an HTTP redirect (<code>303 See Other</code> with a{" "}
        <code>Location</code> header in the demo) and the browser follows it.
      </p>
    ),
  },
  {
    question: "Why is the form empty after a failed submit, and how do you fix it?",
    answer: (
      <p>
        React resets uncontrolled fields after an action finishes. Return the
        submitted values in state and set <code>defaultValue</code> from them
        (but not for sensitive fields).
      </p>
    ),
  },
  {
    question: "Where do expected and unexpected errors go?",
    answer: (
      <p>
        Expected ones (invalid input, a rejected business rule) are returned as
        typed state the form renders. Unexpected ones throw and reach an error
        boundary and monitoring.
      </p>
    ),
  },
  {
    question: "How do you keep redirect and query-string handling safe?",
    answer: (
      <p>
        Encode values you put in a URL, never redirect to an arbitrary
        user-supplied URL, and treat query values as input: bound them, and let
        React escape them on render.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Validation and redirect",
  summary: "Validating input, reporting errors, and redirecting after an action.",
  basics,
  edgeCases,
  interviewQuestions,
};
