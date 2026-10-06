import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/testing/mocking-and-actions/demo";

export const basics = (
  <>
    <p>
      A Server Action is an async function that takes a <code>FormData</code> (and
      maybe a previous state), so a unit test can simply call it. The work is in
      the framework functions it calls, which only exist inside a running Next.js
      request. In a plain Vitest process they behave like this (checked in a
      throwaway test project):
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Call in a unit test</th>
          <th scope="col">What happens</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>redirect(&quot;/somewhere&quot;)</code>
          </td>
          <td>
            Throws <code>NEXT_REDIRECT</code> with a digest like{" "}
            <code>NEXT_REDIRECT;replace;/somewhere;307;</code>: assert on it
          </td>
        </tr>
        <tr>
          <td>
            <code>revalidatePath(&quot;/x&quot;)</code>
          </td>
          <td>
            Throws <em>&quot;static generation store missing&quot;</em>: mock{" "}
            <code>next/cache</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>cookies()</code>, <code>connection()</code>
          </td>
          <td>
            Throw <em>&quot;called outside a request scope&quot;</em>: mock them
          </td>
        </tr>
        <tr>
          <td>
            <code>cacheLife()</code>
          </td>
          <td>
            Throws <em>&quot;only available with the `cacheComponents`
            config&quot;</em>: mock <code>next/cache</code>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      So the recipe is: stub <code>server-only</code>, replace the framework
      functions you do not want to run with <code>vi.fn()</code> spies, call the
      function, and assert on its return value, its thrown error, and the spies.
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> maps ten real tests in this repository
      to the technique each uses.
    </p>
    <CodeBlock title="actions.test.ts" code={`
import { expect, it, vi } from "vitest";

// revalidatePath needs a running Next.js request, so mock next/cache.
// vi.mock is hoisted above imports, so the spy comes from vi.hoisted.
const { revalidatePath } = vi.hoisted(() => ({ revalidatePath: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath }));

it("redirects after a valid submit", async () => {
  const formData = new FormData();
  formData.set("name", "Ada");

  // redirect() throws NEXT_REDIRECT: assert on its digest.
  await expect(createUser(formData)).rejects.toMatchObject({
    digest: expect.stringContaining("/welcome"),
  });
  expect(revalidatePath).toHaveBeenCalledWith("/users");
});
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>A redirect is an exception.</strong> The action never returns on
      success; the test awaits <code>rejects</code> and checks the digest for the
      path and the <code>307</code>, instead of mocking <code>redirect</code>{" "}
      away and losing the check that the right URL was built.
    </li>
    <li>
      <strong>Mock only what needs a request.</strong> The Route Handler tests
      use a real <code>NextRequest</code> and real <code>NextResponse</code> and
      mock only <code>connection()</code>, so the assertions cover the status
      codes, headers, and bodies a client would see.
    </li>
    <li>
      <strong>Fake timers beat waiting.</strong> An action with a one-second
      delay is tested with <code>vi.useFakeTimers()</code> and{" "}
      <code>advanceTimersByTimeAsync</code>, including a check that it has not
      answered one millisecond early.
    </li>
    <li>
      <strong>Stub fetch globally, then assert the call.</strong>{" "}
      <code>vi.stubGlobal(&quot;fetch&quot;, spy)</code> lets the test check the URL
      and the caching options passed, and feed good and bad responses (a 503, a
      wrong shape) to the code under test. Remember to{" "}
      <code>unstubAllGlobals</code> afterwards.
    </li>
    <li>
      <strong>
        A <code>&quot;use cache&quot;</code> function is plain code in a unit
        test.
      </strong>{" "}
      Outside the Next.js build the directive does nothing, so nothing is cached;
      the test checks that the body returns the right data and that it asked for
      the right <code>cacheTag</code> and <code>cacheLife</code> through the
      mocks.
    </li>
    <li>
      <strong>Unit tests cannot prove caching or revalidation.</strong> That
      <code> revalidateTag</code> serves stale data first, or that a static route
      is a cache hit, is framework behavior. It needs a built app: the pull
      requests in this project record those checks with <code>curl</code> and a
      browser against production builds.
    </li>
    <li>
      <strong>Keep logic out of the hard-to-test layer.</strong> The proxy&apos;s
      decisions are a pure function and the schema is tested on its own, so the
      parts that need the framework stay thin.
    </li>
    <li>
      <strong>Test the unhappy paths.</strong> Every action test includes
      invalid, missing, oversized, and tampered input, because a Server Action
      is a public endpoint.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How do you unit test a Server Action?",
    answer: (
      <p>
        Call it as a function with a <code>FormData</code> (and previous state if
        it uses <code>useActionState</code>), stub <code>server-only</code>, mock
        framework calls such as <code>next/cache</code>, and assert on the return
        value, the thrown error, and the spies.
      </p>
    ),
  },
  {
    question: "How do you assert that an action redirects?",
    answer: (
      <p>
        <code>redirect()</code> throws, so the action rejects. Assert on the
        error&apos;s <code>digest</code>, which encodes the destination and
        status (<code>NEXT_REDIRECT;…;/path;307;</code>), rather than mocking{" "}
        <code>redirect</code> and trusting it.
      </p>
    ),
  },
  {
    question: "Why do revalidatePath, cookies, and cacheLife fail in a test?",
    answer: (
      <p>
        They depend on a running Next.js request or build config that a plain
        test process does not have. Replace them with mocks and assert how your
        code used them.
      </p>
    ),
  },
  {
    question: "How do you test code that calls fetch?",
    answer: (
      <p>
        Stub the global <code>fetch</code> with a spy that returns canned{" "}
        <code>Response</code> objects, assert the URL and options it was called
        with, and test the error paths (non-OK status, a response that fails
        schema validation).
      </p>
    ),
  },
  {
    question: "What can't a unit test tell you about Server Actions and caching?",
    answer: (
      <p>
        Anything that is the framework&apos;s behavior: stale-while-revalidate,
        cache hits, prerendering, streaming. Verify those against a production
        build, with an integration or end-to-end test.
      </p>
    ),
  },
  {
    question: "How do you keep these tests from becoming implementation-bound?",
    answer: (
      <p>
        Assert observable results (return values, statuses, headers, thrown
        errors, what the user sees) and mock only the framework boundary. A
        refactor that keeps behavior should not touch the tests.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Mocking and Server Actions",
  summary: "Mocking fetch and cache, and testing Server Actions.",
  basics,
  edgeCases,
  interviewQuestions,
};
