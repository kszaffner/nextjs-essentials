import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { DemoLinks } from "../components/DemoLinks";
import { LocalizedLink } from "@/shared/i18n";

const demoBase = "/fundamentals/dynamic-segments/demo";

function DemoLink({ path, children }: { path: string; children: string }) {
  return (
    <LocalizedLink href={`${demoBase}/${path}`} prefetch={false}>
      {children}
    </LocalizedLink>
  );
}

export const basics = (
  <>
    <p>
      Wrapping a folder name in brackets turns the segment into a parameter.
      Next.js passes the captured values to <code>page</code>,{" "}
      <code>layout</code>, <code>route</code>, and{" "}
      <code>generateMetadata</code> as a <code>params</code> prop, which is a{" "}
      <code>Promise</code>: <code>await</code> it in a Server Component, or{" "}
      <code>use()</code> it in a Client Component.
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Folder</th>
          <th scope="col">Matches</th>
          <th scope="col">
            <code>params</code> type
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>blog/[slug]</code>
          </td>
          <td>
            <code>/blog/a</code>
          </td>
          <td>
            <code>{"{ slug: string }"}</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>shop/[...slug]</code>
          </td>
          <td>
            <code>/shop/a</code>, <code>/shop/a/b</code>, …
          </td>
          <td>
            <code>{"{ slug: string[] }"}</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>docs/[[...slug]]</code>
          </td>
          <td>
            <code>/docs</code> and everything the catch-all matches
          </td>
          <td>
            <code>{"{ slug?: string[] }"}</code>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      With Cache Components, params are runtime data unless{" "}
      <code>generateStaticParams</code> supplies samples. Without it, read{" "}
      <code>params</code> inside a <code>&lt;Suspense&gt;</code> boundary (the
      catch-all demos do); with it, the listed values are prerendered at
      build time (the blog demo does) and any other value is rendered on its
      first request and then cached.
    </p>
    <p>
      Try them: <DemoLink path="blog/hello-nextjs">/blog/hello-nextjs</DemoLink>
      , <DemoLink path="shop/clothes/tops/t-shirts">/shop/clothes/tops/t-shirts</DemoLink>
      , <DemoLink path="docs">/docs</DemoLink>, or any of these:
    </p>
    <DemoLinks />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Params are not decoded.</strong> Requesting{" "}
      <DemoLink path="blog/hello%20world">/blog/hello%20world</DemoLink>{" "}
      gives <code>params.slug === &quot;hello%20world&quot;</code>, and{" "}
      <code>a%2Fb</code> stays <code>a%2Fb</code>. Decode with{" "}
      <code>decodeURIComponent</code> when the value is meant for display or
      lookup.
    </li>
    <li>
      <strong>Params are untrusted strings.</strong> <code>/blog/42</code>{" "}
      gives <code>&quot;42&quot;</code>, not a number, and users can type any
      URL. Validate and narrow the value, and call <code>notFound()</code>{" "}
      for values you do not serve (
      <DemoLink path="validated/99">/validated/99</DemoLink>).
    </li>
    <li>
      <strong>
        <code>dynamicParams = false</code> does not build with Cache
        Components.
      </strong>{" "}
      The route segment config is rejected at build time, so reject unknown
      values by validating the param instead. Without Cache Components it
      would make every value outside <code>generateStaticParams</code> a 404.
    </li>
    <li>
      <strong>
        <code>generateStaticParams</code> must return at least one param
      </strong>{" "}
      under Cache Components. An empty array is a build error, because the
      samples are what lets Next.js validate the route at build time.
    </li>
    <li>
      <strong>Runtime params need Suspense.</strong> Reading{" "}
      <code>params</code> without <code>generateStaticParams</code> and
      outside a <code>&lt;Suspense&gt;</code> boundary fails the build. Any
      Client Component that calls <code>usePathname()</code> hits the same
      rule, including the sidebar of this very site.
    </li>
    <li>
      <strong>Don&apos;t await params at the top of a layout.</strong> It
      makes the whole layout wait for runtime data and keeps it out of the
      static shell. Pass the promise down and await it where it is used.
    </li>
    <li>
      <strong>A static segment beats a dynamic sibling.</strong>{" "}
      <DemoLink path="blog/featured">/blog/featured</DemoLink> is served by
      its own folder, so <code>[slug]</code> never receives{" "}
      <code>featured</code>.
    </li>
    <li>
      <strong>Catch-all vs optional catch-all.</strong>{" "}
      <DemoLink path="shop">/shop</DemoLink> is a 404 for{" "}
      <code>[...slug]</code>, while <DemoLink path="docs">/docs</DemoLink>{" "}
      matches <code>[[...slug]]</code> with an empty <code>params</code> (the{" "}
      <code>slug</code> key is absent, not just <code>undefined</code>).
      Because of that, a <code>page.tsx</code> next to a{" "}
      <code>[[...slug]]</code> in the same folder is a conflict.
    </li>
    <li>
      <strong>Sibling dynamic folders must agree on the name.</strong>{" "}
      <code>[id]</code> and <code>[slug]</code> at the same level is a build
      error.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How do you read a dynamic segment in the App Router?",
    answer: (
      <p>
        Through the <code>params</code> prop of <code>page</code>,{" "}
        <code>layout</code>, <code>route</code>, or{" "}
        <code>generateMetadata</code>. It is a <code>Promise</code>, so{" "}
        <code>await params</code> in a Server Component or{" "}
        <code>use(params)</code> in a Client Component page. Deeper in a
        Client Component tree, <code>useParams()</code> works too.
      </p>
    ),
  },
  {
    question: "What is the difference between [...slug] and [[...slug]]?",
    answer: (
      <p>
        Both capture any number of segments as a <code>string[]</code>. The
        required catch-all needs at least one segment (<code>/shop</code> is
        a 404); the optional one also matches the bare path (
        <code>/docs</code>) with no <code>slug</code> in <code>params</code>.
      </p>
    ),
  },
  {
    question: "How are params typed, and why is that a problem?",
    answer: (
      <p>
        As <code>string</code>, <code>string[]</code>, or{" "}
        <code>undefined</code>, because the real value is whatever the user
        typed in the URL. Treat it like any untrusted input: validate it,
        narrow it to your own type, and call <code>notFound()</code> when it
        is not something you serve. Values also arrive percent-encoded.
      </p>
    ),
  },
  {
    question: "What does generateStaticParams do, and what changes with Cache Components?",
    answer: (
      <p>
        It returns the param sets to prerender at build time. Other values
        are rendered on first request and then cached. With Cache Components
        it must return at least one param (an empty array is a build error),
        it lets the build validate the route&apos;s runtime-API usage, and
        without it params count as runtime data that must be read inside{" "}
        <code>&lt;Suspense&gt;</code>.
      </p>
    ),
  },
  {
    question: "How do you make unknown params return a 404?",
    answer: (
      <p>
        Classically with <code>dynamicParams = false</code>, which 404s every
        value outside <code>generateStaticParams</code>. That segment config
        is rejected when Cache Components is on, so validate the param in the
        page and call <code>notFound()</code>, as the validated demo does.
      </p>
    ),
  },
  {
    question: "Two routes could match /blog/featured. Which wins?",
    answer: (
      <p>
        The more specific one: a static segment (<code>blog/featured</code>)
        beats a dynamic one (<code>blog/[slug]</code>), which beats a
        catch-all. The dynamic route never receives <code>featured</code> as
        a slug.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Dynamic segments",
  summary: "[slug], catch-all [...slug], and optional catch-all [[...slug]].",
  basics,
  edgeCases,
  interviewQuestions,
};
