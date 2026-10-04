import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/data/cache-layers/demo";

export const basics = (
  <>
    <p>
      Next.js caches at four layers, and most &quot;why is this stale?&quot;
      bugs come from not knowing which one is serving you. The classic names
      still describe the mechanisms; with Cache Components some are realized
      differently:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Layer</th>
          <th scope="col">Where</th>
          <th scope="col">What it does</th>
          <th scope="col">With Cache Components</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Request Memoization</th>
          <td>Server, one render</td>
          <td>
            Runs identical <code>GET</code> fetches and <code>React.cache</code>{" "}
            calls once per render
          </td>
          <td>Unchanged</td>
        </tr>
        <tr>
          <th scope="row">Data Cache</th>
          <td>Server, persistent</td>
          <td>Keeps results across requests and deployments</td>
          <td>
            <code>&quot;use cache&quot;</code> with <code>cacheLife</code> and{" "}
            <code>cacheTag</code>
          </td>
        </tr>
        <tr>
          <th scope="row">Full Route Cache</th>
          <td>Server (or CDN)</td>
          <td>Stores prerendered HTML and RSC payload</td>
          <td>The static shell of each route (dynamic holes are never in it)</td>
        </tr>
        <tr>
          <th scope="row">Router Cache</th>
          <td>Client, in memory</td>
          <td>Reuses RSC payloads so navigation is instant</td>
          <td>Client cache with a stale time, plus visited routes kept alive</td>
        </tr>
      </tbody>
    </table>
    <p>
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> makes three of them visible.
      Component A and Component B ask for the same data in one render and both
      see the same run: memoization. The <code>&quot;use cache&quot;</code> run
      number does not move when you reload: the server cache. And the page
      timestamp changes or holds depending on how you return to the page: the
      client layer.
    </p>
    <p>
      Observed on a production build: a static route is served with{" "}
      <code>Cache-Control: s-maxage=31536000</code> as a cache hit, and
      carries <code>x-nextjs-stale-time: 300</code>, the five-minute client
      cache lifetime.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>A Link re-renders; the back button restores.</strong> Going to a
      URL with a <code>Link</code> is a new navigation, and dynamic content is
      rendered on the server again. <code>router.back()</code> or the
      browser&apos;s back button brings back the page you left, with the same
      timestamp, because visited routes are preserved rather than unmounted.
      The demo shows both.
    </li>
    <li>
      <strong>Client state now survives navigation.</strong> With Cache
      Components, routes are kept in a hidden state instead of unmounting, so{" "}
      <code>useState</code> values, form inputs, and scroll position persist
      when you return. Code that relied on unmounting to reset state needs an
      explicit reset.
    </li>
    <li>
      <strong>
        <code>router.refresh()</code> refreshes the page, not the server
        caches.
      </strong>{" "}
      In the demo it re-runs the memoized loader (a new run per refresh) while
      the <code>&quot;use cache&quot;</code> run stays the same. To change
      cached data, invalidate it with <code>revalidateTag</code>,{" "}
      <code>updateTag</code>, or <code>revalidatePath</code>.
    </li>
    <li>
      <strong>Memoization is narrow.</strong> It applies to <code>GET</code>{" "}
      fetches with the same URL and options, and to <code>React.cache</code>.
      It is per render, not in Route Handlers, and a signal from an{" "}
      <code>AbortController</code> opts a request out. Each cache function also
      has its own isolated <code>React.cache</code> scope.
    </li>
    <li>
      <strong>revalidatePath refreshes more than the path.</strong> Called in a
      Server Function it updates the current page immediately, and currently
      also makes previously visited pages refresh when you navigate to them
      again.
    </li>
    <li>
      <strong>Client cache lifetime differs by route type.</strong> Static
      routes are cached for five minutes by default; dynamic content is not
      cached on the client unless you enable it. Prefetching and these
      lifetimes are production behavior, so test with <code>next build</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Name the four Next.js caching layers and what each one does.",
    answer: (
      <p>
        Request Memoization dedupes identical fetches within one server render.
        The Data Cache persists results across requests. The Full Route Cache
        stores prerendered HTML and RSC payload. The Router Cache holds RSC
        payloads in the browser for instant navigation.
      </p>
    ),
  },
  {
    question: "What replaces the Data Cache and Full Route Cache with Cache Components?",
    answer: (
      <p>
        <code>&quot;use cache&quot;</code> (with <code>cacheLife</code> and{" "}
        <code>cacheTag</code>) is the server data cache, and each route&apos;s
        static shell is what the Full Route Cache stored. Request memoization
        is unchanged.
      </p>
    ),
  },
  {
    question: "How is request memoization different from the data cache?",
    answer: (
      <p>
        Memoization lives for a single render and only dedupes identical calls;
        nothing survives the request. The data cache persists across requests
        and is controlled by lifetimes and invalidation.
      </p>
    ),
  },
  {
    question: "Why does a Link re-render the page but the back button does not?",
    answer: (
      <p>
        A Link starts a fresh navigation and dynamic content is not cached on
        the client by default, so the server renders it again. Back/forward
        restores a route that Next.js kept alive, so the same rendered output
        returns without a request.
      </p>
    ),
  },
  {
    question: "How do you invalidate each layer?",
    answer: (
      <p>
        Server data and prerendered output: <code>revalidateTag</code>,{" "}
        <code>updateTag</code>, or <code>revalidatePath</code>. Client router
        cache: <code>router.refresh()</code> (or a stale time expiring).
        Memoization needs no invalidation: it ends with the render.
      </p>
    ),
  },
  {
    question: "Does router.refresh() clear the server cache?",
    answer: (
      <p>
        No. It re-fetches the current route from the server and keeps client
        state, but cached <code>&quot;use cache&quot;</code> data is served as
        before.
      </p>
    ),
  },
];
