import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/data/use-cache-migration/demo";

export const basics = (
  <>
    <p>
      <code>unstable_cache</code> wrapped a function and took a key-parts
      array plus an options object. <code>&quot;use cache&quot;</code> replaces
      it: the directive goes in the function body, the key is derived from the
      arguments, and the options become <code>cacheLife</code> and{" "}
      <code>cacheTag</code> calls.
    </p>
    <pre>
      <code>{`// Before
export const getUser = unstable_cache(
  async (id: string) => db.users.find(id),
  ["user"],                                  // key parts
  { tags: ["users"], revalidate: 3600 },
);

// After
export async function getUser(id: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("users");
  return db.users.find(id);
}`}</code>
    </pre>
    <p>
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> calls the migrated form with the ids{" "}
      <code>1</code>, <code>2</code>, <code>1</code>. Three calls, two distinct
      ids: the body runs at most twice, and reloading adds nothing, because each
      id is its own cache entry.
    </p>
    <p>
      Other legacy APIs move too. Verified against this project&apos;s Next.js
      version:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Legacy</th>
          <th scope="col">Now</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>fetch(url, {"{ cache, next: { revalidate, tags } }"})</code>
          </td>
          <td>
            Fetch inside a <code>&quot;use cache&quot;</code> function;{" "}
            <code>cacheLife</code> and <code>cacheTag</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>export const revalidate</code>
          </td>
          <td>Build error; use <code>cacheLife</code></td>
        </tr>
        <tr>
          <td>
            <code>export const dynamic</code> (<code>force-dynamic</code>,{" "}
            <code>force-static</code>)
          </td>
          <td>Build error; remove it</td>
        </tr>
        <tr>
          <td>
            <code>export const fetchCache</code>
          </td>
          <td>Build error; remove it</td>
        </tr>
        <tr>
          <td>
            <code>export const experimental_ppr</code>
          </td>
          <td>Build error; PPR is the default</td>
        </tr>
        <tr>
          <td>
            <code>export const runtime = &quot;edge&quot;</code>
          </td>
          <td>Build error; remove it</td>
        </tr>
        <tr>
          <td>
            <code>export const dynamicParams</code>
          </td>
          <td>Build error; validate the param and call <code>notFound()</code></td>
        </tr>
        <tr>
          <td>
            <code>unstable_noStore()</code>
          </td>
          <td>
            Not needed; use <code>connection()</code> inside Suspense for
            request-time work
          </td>
        </tr>
        <tr>
          <td>
            <code>revalidateTag(tag)</code>
          </td>
          <td>
            <code>revalidateTag(tag, &quot;max&quot;)</code>, or{" "}
            <code>updateTag</code> in a Server Action
          </td>
        </tr>
        <tr>
          <td>
            <code>React.cache</code>
          </td>
          <td>Usually unchanged</td>
        </tr>
      </tbody>
    </table>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>unstable_cache</code> still builds.
      </strong>{" "}
      A page using it compiled with Cache Components on, and the build output
      even showed a one-minute revalidate. The migration is not forced by an
      error, so it is easy to leave behind. Migrate on purpose.
    </li>
    <li>
      <strong>
        <code>unstable_noStore()</code> does not make a route dynamic.
      </strong>{" "}
      A page that only called it was still prerendered as static (○). Do not
      rely on it for per-request rendering; use <code>connection()</code> and{" "}
      <code>&lt;Suspense&gt;</code>.
    </li>
    <li>
      <strong>Route segment configs fail loudly.</strong>{" "}
      <code>dynamic</code>, <code>revalidate</code>, <code>fetchCache</code>,{" "}
      <code>experimental_ppr</code>, <code>runtime</code>, and{" "}
      <code>dynamicParams</code> each fail the build with{" "}
      <em>
        &quot;Route segment config &quot;…&quot; is not compatible with
        `nextConfig.cacheComponents`. Please remove it.&quot;
      </em>
    </li>
    <li>
      <strong>The key is the arguments, so keep them small.</strong> Arguments
      and any values captured from the surrounding scope become part of the
      cache key. Pass an id, not a large object, and pass runtime data in as
      arguments.
    </li>
    <li>
      <strong>Cached code cannot read request data.</strong> A{" "}
      <code>&quot;use cache&quot;</code> function cannot call{" "}
      <code>cookies()</code> or <code>headers()</code>; read them outside and
      pass the values in.
    </li>
    <li>
      <strong>Tag per entry when you need per-entry invalidation.</strong> The
      demo tags each user with <code>{"`user-${id}`"}</code>; a single shared
      tag invalidates all entries together.
    </li>
    <li>
      <strong>Set a lifetime.</strong> Without <code>cacheLife</code> the
      implicit <code>default</code> profile applies (15 minutes to revalidate,
      never expires), which rarely matches what <code>unstable_cache</code>{" "}
      options said.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How do you migrate unstable_cache to use cache?",
    answer: (
      <p>
        Turn the wrapped function into a function with{" "}
        <code>&quot;use cache&quot;</code> in its body. Drop the key-parts array
        (the key comes from the arguments), and map the options: <code>revalidate</code>{" "}
        becomes <code>cacheLife</code>, <code>tags</code> become{" "}
        <code>cacheTag</code>.
      </p>
    ),
  },
  {
    question: "How is the cache key built with use cache?",
    answer: (
      <p>
        Automatically, from the function&apos;s arguments and any values it
        captures from the parent scope. Different arguments give separate
        entries, as the demo shows with distinct user ids.
      </p>
    ),
  },
  {
    question: "What happens to fetch's cache and next options?",
    answer: (
      <p>
        Move the fetch into a <code>&quot;use cache&quot;</code> function. Its
        requests are cached automatically, and <code>next.revalidate</code> and{" "}
        <code>next.tags</code> become <code>cacheLife</code> and{" "}
        <code>cacheTag</code>.
      </p>
    ),
  },
  {
    question: "What do you do with export const dynamic = \"force-dynamic\"?",
    answer: (
      <p>
        Remove it: it is a build error with Cache Components. Put the
        request-time part behind <code>connection()</code> (or runtime data)
        inside <code>&lt;Suspense&gt;</code>; everything else stays static.
      </p>
    ),
  },
  {
    question: "What replaces unstable_noStore?",
    answer: (
      <p>
        Nothing is cached unless you add <code>&quot;use cache&quot;</code>, so
        it is not needed. For work that must run per request, call{" "}
        <code>connection()</code> before it and wrap it in Suspense.
        <code> noStore()</code> alone does not force dynamic rendering.
      </p>
    ),
  },
  {
    question: "Why can't a use cache function call cookies()?",
    answer: (
      <p>
        A cached result is shared across requests, so it cannot depend on one
        request&apos;s data. Read the cookie outside and pass what you need as
        an argument, which also puts it in the cache key.
      </p>
    ),
  },
];
