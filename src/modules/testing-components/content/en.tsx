import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/testing/server-vs-client/demo";

export const basics = (
  <>
    <p>
      What you test with depends on what the component is. This project uses
      Vitest with React Testing Library and jsdom (<code>pnpm test</code>).
    </p>
    <ul>
      <li>
        <strong>Synchronous Server Components</strong> and plain presentational
        components are just functions that return JSX: render them and assert on
        what a user sees (<code>GreetingCard</code>).
      </li>
      <li>
        <strong>Client Components</strong> need a DOM, user events, and a
        stand-in for the App Router: mock <code>next/navigation</code> and click
        (<code>FavouriteButton</code>).
      </li>
      <li>
        <strong>Async Server Components</strong> cannot be rendered as JSX by
        the test renderer. Next.js recommends end-to-end tests for them; a
        practical unit-level pattern is to call the component as a function,
        await the result, and render that, injecting the data source as a prop (
        <code>AsyncProfileCard</code>).
      </li>
    </ul>
    <p>
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> renders the three side by side; their
      tests sit next to them in <code>src/modules/testing-components/components</code>.
    </p>
    <CodeBlock code={`// the pattern that works for an async Server Component
render(await AsyncProfileCard({ profileId: "ada", loadProfile }));`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Rendering an async component as JSX passes silently.</strong> It
      does not throw: it renders nothing. A test that renders{" "}
      <code>&lt;AsyncProfileCard /&gt;</code> and then asserts only that nothing
      crashed would go green while testing nothing. The repository has a test
      that documents this (the container&apos;s text is empty), and it will
      fail loudly if React starts supporting it.
    </li>
    <li>
      <strong>Inject the data source.</strong> The async card takes{" "}
      <code>loadProfile</code> as a prop, so a test passes a fake, a missing
      profile, or a failing loader without any network, database, or module
      mocking.
    </li>
    <li>
      <strong>Errors propagate by design.</strong> A throwing loader makes the
      component reject; in the app an error boundary catches it. The test
      asserts the rejection instead of swallowing it.
    </li>
    <li>
      <strong>Mock the router, not the component.</strong>{" "}
      <code>useRouter</code> only works inside the App Router, so the test
      replaces <code>next/navigation</code> with a spy and asserts the
      destination the component asked for.
    </li>
    <li>
      <strong>Server-only modules need a stub.</strong> Code that imports{" "}
      <code>server-only</code> throws in a test, because the test is not in the
      server module graph; stub it with{" "}
      <code>vi.mock(&quot;server-only&quot;, () =&gt; ({"{}"}))</code>.
    </li>
    <li>
      <strong>Unit tests do not cover streaming, caching, or layout.</strong>{" "}
      Suspense fallbacks, static shells, and error boundaries across routes need
      a browser. This repository has no Playwright suite yet; those behaviors
      were checked by hand against production builds (the pull requests list
      what was observed), and an end-to-end suite for critical journeys is the
      natural next step.
    </li>
    <li>
      <strong>Test behavior, not structure.</strong> Queries by role and text (
      <code>getByRole(&quot;button&quot;, ...)</code>) survive a refactor;
      assertions on class names or component internals do not.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How do you test a Server Component?",
    answer: (
      <p>
        If it is synchronous, render it like any component. If it is async, the
        test renderer cannot render it as JSX, so either call it as a function
        and render the awaited result (injecting its data source), or test the
        route end to end in a browser.
      </p>
    ),
  },
  {
    question: "Why can a test of an async component pass while testing nothing?",
    answer: (
      <p>
        Rendering it as JSX produces no output and no error, so assertions about
        &quot;no crash&quot; succeed. Always assert on visible content, which
        fails for the empty render.
      </p>
    ),
  },
  {
    question: "How do you test a Client Component that uses useRouter?",
    answer: (
      <p>
        Mock <code>next/navigation</code> so <code>useRouter</code> returns a
        spy, render the component, interact with it, and assert that{" "}
        <code>push</code> was called with the expected path.
      </p>
    ),
  },
  {
    question: "What does Next.js recommend for async Server Components?",
    answer: (
      <p>
        End-to-end tests, because Vitest and the React test renderer do not
        support async Server Components yet. Unit tests remain fine for
        synchronous Server Components and Client Components.
      </p>
    ),
  },
  {
    question: "How do you make a component easy to test?",
    answer: (
      <p>
        Pass its dependencies in (a loader function, an id) instead of importing
        a concrete data source, keep logic in pure functions, and keep the
        component thin, so each part has a cheap test.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Server vs Client Components",
  summary: "Testing each kind of component.",
  basics,
  edgeCases,
  interviewQuestions,
};
