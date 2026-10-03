import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoBase = "/fundamentals/intercepting-routes/demo";

export const basics = (
  <>
    <p>
      An intercepting route loads another route <em>inside the current
      layout</em> while the browser URL shows the target route. The classic
      case is a photo in a gallery: clicking it opens a modal over the feed
      at <code>/photo/1</code>, but opening that URL directly renders the
      full page.
    </p>
    <p>The folder prefix says how many route levels up to look for the target:</p>
    <ul>
      <li>
        <code>(.)</code> same level, <code>(..)</code> one level up,{" "}
        <code>(..)(..)</code> two levels up, <code>(...)</code> from the root{" "}
        <code>app</code> directory.
      </li>
      <li>
        The levels are <strong>route segments</strong>, not folders on disk:{" "}
        <code>@slot</code> folders and <code>(group)</code> folders do not
        count.
      </li>
    </ul>
    <p>
      The demo combines it with a parallel route:{" "}
      <code>demo/@modal/(.)photo/[id]/page.tsx</code> intercepts{" "}
      <code>demo/photo/[id]</code>, and the layout renders the{" "}
      <code>modal</code> slot next to <code>children</code>. Try the{" "}
      <Link href={demoBase}>gallery</Link>.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Interception only happens on soft navigation.</strong> A
      reload, a shared link, or a new tab does a hard navigation, so the real{" "}
      <code>photo/[id]</code> page renders. Both pages must exist and work.
    </li>
    <li>
      <strong>The slot needs a <code>default.tsx</code> returning null.</strong>{" "}
      Without it, a hard navigation to any URL where <code>@modal</code> has
      no match renders a 404.
    </li>
    <li>
      <strong>Close with <code>router.back()</code>, not a link to the feed.</strong>{" "}
      Going back keeps history coherent: the back button closes the modal and
      forward reopens it.
    </li>
    <li>
      <strong><code>(..)</code> counts segments, not folders.</strong> Putting
      the intercepting folder inside <code>@modal</code> or a{" "}
      <code>(group)</code> does not change the number of <code>..</code>.
    </li>
    <li>
      <strong>Dynamic params follow the same rules as any route.</strong> The
      demo lists the ids in <code>generateStaticParams</code> for both the
      modal and the full page; without that, params are runtime data under
      Cache Components.
    </li>
    <li>
      <strong>Modal content can stay a Server Component.</strong> Keep the
      client-only part (<code>dialog</code> and <code>useRouter</code>) in a
      small wrapper and pass the content as <code>children</code>, as the
      demo does.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What problem do intercepting routes solve?",
    answer: (
      <p>
        Showing a route in the current context (a modal over a feed) while
        keeping a real, shareable URL. A direct visit or refresh renders the
        full page; a client-side navigation renders the intercepted version.
      </p>
    ),
  },
  {
    question: "How do (.), (..), (..)(..), and (...) differ?",
    answer: (
      <p>
        They select which level of the <em>route tree</em> to match, like{" "}
        <code>./</code> and <code>../</code>: same level, one up, two up, or
        the root of <code>app</code>. They ignore <code>@slot</code> and{" "}
        <code>(group)</code> folders because those are not segments.
      </p>
    ),
  },
  {
    question: "Why are intercepting routes usually paired with parallel routes?",
    answer: (
      <p>
        The intercepted page needs somewhere to render without replacing the
        current page. A <code>@modal</code> slot provides that: the layout
        renders it next to <code>children</code>, so the gallery stays
        mounted underneath.
      </p>
    ),
  },
  {
    question: "What happens when a user refreshes while the modal is open?",
    answer: (
      <p>
        The refresh is a hard navigation, so there is no interception: the
        dedicated page for that URL renders in full, and the slot falls back
        to its <code>default.tsx</code>.
      </p>
    ),
  },
  {
    question: "How should a modal close, and why?",
    answer: (
      <p>
        With <code>router.back()</code>. The modal was opened by a navigation,
        so going back pops that history entry: the URL returns to the feed,
        the back button behaves, and forward reopens the modal. A plain link
        to the feed would add a history entry instead.
      </p>
    ),
  },
];
