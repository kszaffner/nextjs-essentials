import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoBase = "/fundamentals/parallel-routes/demo";

export const basics = (
  <>
    <p>
      A folder that starts with <code>@</code> is a <strong>slot</strong>. It
      is not a URL segment; instead the parent layout receives the slot&apos;s
      page as a prop with the same name, next to the implicit{" "}
      <code>children</code> slot. The layout decides where each slot renders,
      so one URL can show several independent pages at once.
    </p>
    <p>In the demo, the layout has three slots:</p>
    <ul>
      <li>
        <code>children</code> from <code>demo/page.tsx</code>,
      </li>
      <li>
        <code>team</code> from <code>demo/@team/page.tsx</code>,
      </li>
      <li>
        <code>analytics</code> from <code>demo/@analytics/page.tsx</code>,
        which is deliberately slow and has its own <code>loading.tsx</code>,
        so it streams in on its own while the others are already visible.
      </li>
    </ul>
    <p>
      Each slot has its own navigation state, loading UI, and error
      boundary. Only <code>@team</code> has a <code>settings</code> page: open{" "}
      <Link href={`${demoBase}/settings`}>/demo/settings</Link> with a soft
      navigation and just the team panel changes, the other two keep what
      they showed. Then reload the page and compare.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Soft and hard navigation behave differently.</strong> On a
      client-side navigation, a slot with no matching page keeps showing its
      current content even though it does not match the URL. After a full page
      load Next.js cannot recover that state, so it renders the slot&apos;s{" "}
      <code>default.tsx</code>, or a <strong>404</strong> if there is none.
    </li>
    <li>
      <strong>
        <code>children</code> needs a <code>default.tsx</code> too.
      </strong>{" "}
      It is an implicit slot, so a reload on <code>/demo/settings</code>{" "}
      (where only <code>@team</code> matches) renders{" "}
      <code>demo/default.tsx</code> for it, or a 404 without one.
    </li>
    <li>
      <strong>Slots are not URL segments.</strong> <code>@team</code> never
      appears in a URL, and intercepting-route conventions like{" "}
      <code>(..)</code> ignore <code>@slot</code> folders when counting
      levels.
    </li>
    <li>
      <strong>The slot name is the prop name.</strong> Rename the folder and
      you must rename the destructured prop in the layout; a mismatch renders
      nothing for that slot.
    </li>
    <li>
      <strong>Slots stream and fail independently.</strong> A slow or
      throwing slot shows its own <code>loading.tsx</code> or{" "}
      <code>error.tsx</code> without taking the sibling slots down.
    </li>
    <li>
      <strong>Closing a conditional slot needs a matching route.</strong> A
      slot that no longer matches stays visible on soft navigation, so to
      &quot;hide&quot; it you need a route (often a catch-all returning{" "}
      <code>null</code>) that matches.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is a parallel route and how does the layout use it?",
    answer: (
      <p>
        A parallel route is an <code>@slot</code> folder. It does not change
        the URL. The parent layout receives each slot&apos;s page as a prop
        (<code>children</code>, <code>team</code>, <code>analytics</code>, …)
        and places it in the UI, so several pages render side by side for one
        URL.
      </p>
    ),
  },
  {
    question: "Why does a parallel route 404 after a page refresh but not on client navigation?",
    answer: (
      <p>
        On a soft navigation Next.js keeps each slot&apos;s previous active
        state. After a full page load it can only match slots against the
        current URL, so an unmatched slot renders <code>default.tsx</code> or
        a 404 when none exists. The 404 stops a slot from appearing on a URL
        it was never meant for.
      </p>
    ),
  },
  {
    question: "What does default.tsx do, and is children affected?",
    answer: (
      <p>
        It is the fallback for a slot that has no match during a hard
        navigation. <code>children</code> is an implicit slot, so it needs its
        own <code>default.tsx</code> as well whenever a deeper URL only
        matches some slots.
      </p>
    ),
  },
  {
    question: "What are the benefits of parallel routes besides layout flexibility?",
    answer: (
      <p>
        Independent streaming and error handling per slot (each can have its
        own <code>loading.tsx</code> and <code>error.tsx</code>), conditional
        rendering based on a slot (for example by role), tab groups, and, with
        intercepting routes, URL-addressable modals.
      </p>
    ),
  },
  {
    question: "Does an @slot folder count as a segment for the (..) intercepting convention?",
    answer: (
      <p>
        No. Intercepting conventions count route segments, not file-system
        folders, so <code>@slot</code> folders are ignored.
      </p>
    ),
  },
];
