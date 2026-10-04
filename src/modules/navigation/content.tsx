import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoPath = "/fundamentals/navigation/demo";

export const basics = (
  <>
    <p>
      Next.js navigates on the client: it fetches the next route&apos;s React
      Server Component payload and swaps it in without a full page load, while
      shared layouts stay mounted. The tools:
    </p>
    <ul>
      <li>
        <code>&lt;Link&gt;</code> (from <code>next/link</code>) is the default
        way to navigate. It prefetches, supports <code>replace</code> and{" "}
        <code>scroll</code>, and renders a real <code>&lt;a&gt;</code>.
      </li>
      <li>
        <code>useRouter()</code> (from <code>next/navigation</code>) navigates
        from code: <code>push</code>, <code>replace</code>, <code>back</code>,{" "}
        <code>forward</code>, <code>refresh</code>, and <code>prefetch</code>.
      </li>
      <li>
        <code>usePathname()</code> and <code>useSearchParams()</code> read the
        current URL in a Client Component and update on navigation.
      </li>
    </ul>
    <p>
      <strong>Prefetching.</strong> A <code>&lt;Link&gt;</code> prefetches its
      route when it enters the viewport (production builds only). A static
      route is prefetched in full; a dynamic route is prefetched only down to
      the nearest <code>loading.tsx</code>, or not at all without one. Pass{" "}
      <code>prefetch={"{false}"}</code> to opt out, or call{" "}
      <code>router.prefetch()</code> to warm a route on demand.
    </p>
    <p>
      Try the <LocalizedLink href={demoPath}>playground</LocalizedLink>: it shows the current
      pathname and search params, and the buttons exercise the router methods.
      <code> router.refresh()</code> re-renders the server clock below it
      without resetting the client state.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Import from <code>next/navigation</code>.</strong>{" "}
      <code>next/router</code> is the Pages Router API and does not work in
      the App Router (it is shown here only as a contrast).
    </li>
    <li>
      <strong>
        <code>useSearchParams()</code> needs a <code>&lt;Suspense&gt;</code>{" "}
        boundary under Cache Components.
      </strong>{" "}
      Search params are runtime data; without a boundary the build fails (the
      playground page wraps it). The same goes for any per-request Server
      Component.
    </li>
    <li>
      <strong>Prefetching is off in development.</strong> It only runs in
      production builds, so test navigation speed against{" "}
      <code>next build</code> + <code>next start</code>.
    </li>
    <li>
      <strong><code>&lt;Link&gt;</code> must hydrate before it prefetches.</strong>{" "}
      A heavy JavaScript bundle delays hydration, and with it prefetching.
    </li>
    <li>
      <strong>Dynamic routes without <code>loading.tsx</code> are not prefetched</strong>{" "}
      (or only partially), so clicking them waits for the server. Add a{" "}
      <code>loading.tsx</code> or a <code>&lt;Suspense&gt;</code> boundary.
    </li>
    <li>
      <strong><code>push</code> vs <code>replace</code>.</strong>{" "}
      <code>push</code> adds a history entry, <code>replace</code> overwrites
      the current one, so the back button skips it. <code>&lt;Link replace&gt;</code>{" "}
      does the same declaratively.
    </li>
    <li>
      <strong>
        <code>router.refresh()</code> re-fetches server output, not client
        state.
      </strong>{" "}
      Server Components re-render; Client Component state is preserved.
    </li>
    <li>
      <strong>Layouts don&apos;t re-render on navigation,</strong> so highlight
      the active link with <code>usePathname()</code> in a Client Component
      (this site&apos;s sidebar does).
    </li>
    <li>
      <strong>Prefetched data can go stale.</strong> Prefetched payloads are
      cached on the client (5 minutes for static routes by default) and
      refreshed on a later prefetch.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "How does Link prefetching work, and when does it run?",
    answer: (
      <p>
        When a <code>&lt;Link&gt;</code> enters the viewport, Next.js
        prefetches the route in the background, scheduling work so many links
        do not flood the network. It runs only in production. Static routes are
        prefetched in full; dynamic routes only to the nearest{" "}
        <code>loading.tsx</code> boundary.
      </p>
    ),
  },
  {
    question: "How do you disable or control prefetching?",
    answer: (
      <p>
        <code>&lt;Link prefetch={"{false}"}&gt;</code> disables it entirely,
        including on hover. <code>prefetch={"{true}"}</code> prefetches the full
        route. For custom behavior, such as prefetching on hover only, call{" "}
        <code>router.prefetch()</code> yourself.
      </p>
    ),
  },
  {
    question: "What is the difference between router.push, router.replace, and router.refresh?",
    answer: (
      <p>
        <code>push</code> navigates and adds a history entry;{" "}
        <code>replace</code> navigates without adding one. <code>refresh</code>{" "}
        stays on the same URL and re-fetches the Server Components output,
        keeping client state.
      </p>
    ),
  },
  {
    question: "Why does useSearchParams need Suspense in this project?",
    answer: (
      <p>
        With Cache Components, search params are only known at request time,
        so a Client Component reading them cannot be part of the prerendered
        static shell. A surrounding <code>&lt;Suspense&gt;</code> lets Next.js
        prerender the shell and stream the part that depends on the URL.
      </p>
    ),
  },
  {
    question: "How do you highlight the active link in a layout?",
    answer: (
      <p>
        Layouts don&apos;t re-render on navigation, so read{" "}
        <code>usePathname()</code> in a small Client Component (a nav link)
        and compare it to the link&apos;s <code>href</code>. Under Cache
        Components, wrap it in <code>&lt;Suspense&gt;</code> for routes with
        dynamic params.
      </p>
    ),
  },
  {
    question: "next/router or next/navigation?",
    answer: (
      <p>
        <code>next/navigation</code> in the App Router. <code>next/router</code>{" "}
        belongs to the Pages Router and throws in the App Router.
      </p>
    ),
  },
];
