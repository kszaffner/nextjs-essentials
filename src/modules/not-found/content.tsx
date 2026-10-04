import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/errors/not-found/demo";

export const basics = (
  <>
    <p>
      Calling <code>notFound()</code> stops rendering and shows the closest{" "}
      <code>not-found.tsx</code>. The root <code>not-found.tsx</code> also
      answers any URL that matches no route at all. Segments can have their own
      version, so a missing item can say &quot;no such item&quot; while an
      unknown URL says &quot;page not found&quot;.
    </p>
    <pre>
      <code>{`export default async function Page({ params }) {
  const { slug } = await params;
  if (!isKnownSlug(slug)) {
    notFound();           // throws; the closest not-found.tsx renders
  }
  return <Item slug={slug} />;
}`}</code>
    </pre>
    <p>
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> checks the HTTP status of five
      requests on a production build:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Request</th>
          <th scope="col">Status</th>
          <th scope="col">noindex</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>An existing slug</td>
          <td>200</td>
          <td>no</td>
        </tr>
        <tr>
          <td>
            An unknown slug, <code>notFound()</code> before streaming
          </td>
          <td>
            <strong>404</strong>
          </td>
          <td>yes</td>
        </tr>
        <tr>
          <td>
            An unknown slug, <code>notFound()</code> inside Suspense
          </td>
          <td>
            <strong>200</strong>
          </td>
          <td>yes</td>
        </tr>
        <tr>
          <td>A URL that matches no route</td>
          <td>404</td>
          <td>yes</td>
        </tr>
      </tbody>
    </table>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Where you call it decides the status.</strong> Before anything
      streams, <code>notFound()</code> gives a real <code>404</code>. Inside a{" "}
      <code>&lt;Suspense&gt;</code> boundary, after the shell is sent, the status
      is already <code>200</code> and cannot change. Check that the resource
      exists before any boundary and before any <code>await</code> that may
      suspend, if you need the 404 (for SEO tools, analytics, or monitoring).
    </li>
    <li>
      <strong>A streamed 404 is still marked noindex.</strong> Next.js adds{" "}
      <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;&gt;</code>{" "}
      to a not-found response, including the streamed one, so search engines do
      not index it even though the status is 200 (some crawlers call that a
      &quot;soft 404&quot;).
    </li>
    <li>
      <strong>It works by throwing.</strong> The payload of the streamed case
      carried the digest <code>NEXT_HTTP_ERROR_FALLBACK;404</code>. A{" "}
      <code>try/catch</code> around <code>notFound()</code> swallows it; call it
      outside the block or rethrow with <code>unstable_rethrow</code>.
    </li>
    <li>
      <strong>The closest file wins.</strong> A segment&apos;s own{" "}
      <code>not-found.tsx</code> answers <code>notFound()</code> calls below
      it; the root one answers unmatched URLs and anything with no closer file.
    </li>
    <li>
      <strong>Unmatched URLs are the root file&apos;s job.</strong> A path
      deeper than any route (<code>/demo/no/such/route</code>) rendered the root{" "}
      <code>not-found.tsx</code> with a <code>404</code>. The experimental{" "}
      <code>global-not-found.tsx</code> can replace the whole document for
      unmatched URLs.
    </li>
    <li>
      <strong>Validate params before using them.</strong> A slug is
      user-controlled text; look it up in your data and call{" "}
      <code>notFound()</code> for anything you do not serve instead of
      rendering with it.
    </li>
    <li>
      <strong>The default 404 ignores your theme.</strong> Next.js&apos;s
      built-in page follows only the OS color scheme; provide your own file to
      control it.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What does notFound() do?",
    answer: (
      <p>
        It throws a special error that stops rendering and makes Next.js render
        the closest <code>not-found.tsx</code>, inside the surrounding layouts.
        Use it when a requested resource does not exist.
      </p>
    ),
  },
  {
    question: "Why can a not-found page return 200?",
    answer: (
      <p>
        If <code>notFound()</code> runs after the response started streaming
        (inside Suspense), the status was already sent. Next.js then adds a{" "}
        <code>noindex</code> meta tag. To get a real 404, check the resource
        before any Suspense boundary.
      </p>
    ),
  },
  {
    question: "What is the difference between not-found.tsx in a segment and in the root?",
    answer: (
      <p>
        A segment&apos;s file answers <code>notFound()</code> calls from that
        segment and below, with a contextual message. The root file answers
        those with no closer file plus every URL that matches no route.
      </p>
    ),
  },
  {
    question: "Why does notFound() not work inside try/catch?",
    answer: (
      <p>
        It signals by throwing, so a <code>catch</code> block swallows it. Call
        it outside the block, or rethrow Next.js errors with{" "}
        <code>unstable_rethrow</code>.
      </p>
    ),
  },
  {
    question: "How do you handle unknown dynamic params?",
    answer: (
      <p>
        Look the param up against your data and call <code>notFound()</code> if
        it is not found. (<code>dynamicParams = false</code> is rejected with
        Cache Components, so validation is the way.)
      </p>
    ),
  },
];
