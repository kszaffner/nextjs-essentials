import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/data/revalidation/demo";

export const basics = (
  <>
    <p>
      Cached data stays until its lifetime ends or you invalidate it. On-demand
      invalidation comes in two shapes: <strong>by tag</strong> (label the data
      with <code>cacheTag</code>, expire it with a tag function) or{" "}
      <strong>by path</strong> (<code>revalidatePath</code>). The demo adds an
      entry to an in-memory list and invalidates a cached view of it four
      different ways. Observed behavior:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Call</th>
          <th scope="col">Where</th>
          <th scope="col">Right after the action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <code>updateTag(tag)</code>
          </th>
          <td>Server Actions only</td>
          <td>The list shows the new entry immediately</td>
        </tr>
        <tr>
          <th scope="row">
            <code>revalidateTag(tag, &quot;max&quot;)</code>
          </th>
          <td>Server Actions and Route Handlers</td>
          <td>
            The old list is still shown, and on the next visit too while it
            regenerates; a later visit shows the new entry
          </td>
        </tr>
        <tr>
          <th scope="row">
            <code>revalidatePath(path)</code>
          </th>
          <td>Server Functions and Route Handlers</td>
          <td>The list shows the new entry immediately</td>
        </tr>
        <tr>
          <th scope="row">
            <code>refresh()</code>
          </th>
          <td>Server Actions only</td>
          <td>
            Nothing changes, even after a reload: it refreshes the router, not
            the cache
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Try them in the <LocalizedLink href={demoHref}>demo</LocalizedLink>. Pick by the behavior
      you want: <code>updateTag</code> when the user must see their own change
      now, <code>revalidateTag</code> with <code>&quot;max&quot;</code> when
      serving slightly stale data while refreshing is fine, and{" "}
      <code>revalidatePath</code> when you think in pages rather than data.
    </p>
    <CodeBlock title="actions.ts" code={`
"use server";

import { refresh, revalidatePath, revalidateTag, updateTag } from "next/cache";

export async function addWithUpdateTag() {
  addEntry();
  updateTag("entries");              // next render waits for fresh data (Server Actions only)
}

export async function addWithRevalidateTag() {
  addEntry();
  revalidateTag("entries", "max");   // stale-while-revalidate
}

export async function addWithRevalidatePath() {
  addEntry();
  revalidatePath("/entries", "page"); // by path instead of by tag
}

export async function addWithRefresh() {
  addEntry();
  refresh();                         // refreshes the router, invalidates no cache
}
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>revalidateTag</code> needs a profile.
      </strong>{" "}
      The single-argument form is deprecated and behaves like{" "}
      <code>{"{ expire: 0 }"}</code> (the next request blocks on fresh data).
      Pass <code>&quot;max&quot;</code> for stale-while-revalidate, or use{" "}
      <code>updateTag</code> in a Server Action.
    </li>
    <li>
      <strong>
        <code>updateTag</code> only works in Server Actions.
      </strong>{" "}
      Calling it in a Route Handler or anywhere else throws. In webhooks and
      Route Handlers use <code>revalidateTag</code>.
    </li>
    <li>
      <strong>Revalidation is request-driven.</strong> Calling{" "}
      <code>revalidateTag</code> only marks data stale; pages regenerate as
      they are visited, not all at once. That is why the demo needs more than
      one visit to show the new entry.
    </li>
    <li>
      <strong>Dynamic paths need a type.</strong> <code>revalidatePath(&quot;/product/[slug]&quot;)</code>{" "}
      requires <code>&quot;page&quot;</code> or <code>&quot;layout&quot;</code>{" "}
      as the second argument; a literal path like <code>/product/1</code>{" "}
      omits it. A <code>&quot;layout&quot;</code> invalidates the layout, nested
      layouts, and every page beneath.
    </li>
    <li>
      <strong>Route Handlers only mark the path.</strong> There,{" "}
      <code>revalidatePath</code> does not regenerate immediately; the work
      happens the next time someone visits the path.
    </li>
    <li>
      <strong>Tags are exact strings.</strong> Case-sensitive, at most 256
      characters, and a longer tag is never attached to cached data, so
      revalidating it silently does nothing.
    </li>
    <li>
      <strong>Server-only.</strong> None of these can be called from Client
      Components or Proxy. And an action that invalidates real data must check
      authorization itself; the demo&apos;s actions are public only because
      they take no input and touch an in-memory demo list.
    </li>
    <li>
      <strong>The demo store is process memory.</strong> It is coherent on one
      server process; on serverless platforms each instance would have its own
      list.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "revalidateTag or revalidatePath?",
    answer: (
      <p>
        <code>revalidateTag</code> invalidates every cached result carrying a
        tag, across all pages that use it: best when you think in data.{" "}
        <code>revalidatePath</code> invalidates a specific page or layout: best
        when you think in routes. Tags are more precise; paths are simpler.
      </p>
    ),
  },
  {
    question: "updateTag or revalidateTag(tag, \"max\")?",
    answer: (
      <p>
        <code>updateTag</code> (Server Actions only) expires the data so the
        next request waits for fresh content: read-your-own-writes.{" "}
        <code>revalidateTag</code> with <code>&quot;max&quot;</code> serves
        stale content while it regenerates, which is faster but means the user
        may briefly see old data.
      </p>
    ),
  },
  {
    question: "Why does revalidateTag now take a second argument?",
    answer: (
      <p>
        It sets how long stale content may still be served. <code>&quot;max&quot;</code>{" "}
        means stale-while-revalidate for up to a year, <code>{"{ expire: 0 }"}</code>{" "}
        means never serve stale. The old single-argument form is deprecated and
        acts like the latter.
      </p>
    ),
  },
  {
    question: "What does refresh() do, and what does it not do?",
    answer: (
      <p>
        Called from a Server Action it refreshes the client router so uncached
        data re-renders. It does not invalidate any cache: in the demo the
        cached list stays the same, even after a reload.
      </p>
    ),
  },
  {
    question: "Where can each invalidation function be called?",
    answer: (
      <p>
        <code>updateTag</code> and <code>refresh</code>: Server Actions only.{" "}
        <code>revalidateTag</code> and <code>revalidatePath</code>: Server
        Functions and Route Handlers. None of them from Client Components or
        Proxy.
      </p>
    ),
  },
  {
    question: "When does cached data actually regenerate after revalidateTag?",
    answer: (
      <p>
        On a later request, not at the moment of the call. The call marks the
        data stale; the next visit triggers regeneration (serving stale in the
        meantime with <code>&quot;max&quot;</code>), and a visit after that gets
        the new data.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Revalidation",
  summary: "revalidatePath and revalidateTag.",
  basics,
  edgeCases,
  interviewQuestions,
};
