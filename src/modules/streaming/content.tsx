import Link from "next/link";
import type { InterviewQuestion } from "@/shared/topic-page";

const demoHref = "/rendering/streaming/demo";

export const basics = (
  <>
    <p>
      Streaming lets the server send HTML in pieces. Next.js sends the shell
      immediately, with a <code>&lt;Suspense&gt;</code> fallback wherever a part
      is not ready, then streams each part in as it resolves. Two ways to place
      a boundary:
    </p>
    <ul>
      <li>
        <code>loading.tsx</code> wraps the page and nested layouts of its
        segment in a boundary with that fallback (see{" "}
        <Link href="/fundamentals/file-conventions">file conventions</Link>).
      </li>
      <li>
        <code>&lt;Suspense&gt;</code> inside your own tree gives finer control:
        one boundary per slow part.
      </li>
    </ul>
    <p>
      The <Link href={demoHref}>demo</Link> has two sections. With one boundary
      per block, the three blocks appear independently. Measured on a
      production build, the shell arrived after about 26 ms and the blocks
      after about 0.34 s, 1.24 s, and 2.44 s. With one shared boundary, the
      three blocks appear together after the slowest, and the whole response
      took about 2.4 s, not the sum of the delays, because the blocks render
      in parallel.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>The status code is already sent.</strong> Once the shell
      streams, the response is <code>200</code>. A <code>notFound()</code> or{" "}
      <code>redirect()</code> inside streamed content cannot change it; for a
      404, Next.js adds <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;&gt;</code>{" "}
      to the HTML instead.
    </li>
    <li>
      <strong>Check before you suspend.</strong> To get a real 404 status,
      verify the resource exists before any Suspense boundary and before any{" "}
      <code>await</code> that may suspend, or rewrite missing slugs in Proxy.
    </li>
    <li>
      <strong>A shared boundary waits for its slowest child.</strong> Children
      inside one boundary render in parallel, but the boundary reveals
      together. Split boundaries to reveal independently.
    </li>
    <li>
      <strong>A boundary too high up shows too little.</strong> Wrapping the
      whole page leaves the shell as a fallback. Put boundaries around only the
      slow parts so the rest stays instant.
    </li>
    <li>
      <strong>Runtime data requires a boundary.</strong> With Cache Components,
      reading <code>cookies()</code>, <code>headers()</code>, or uncached data
      outside <code>&lt;Suspense&gt;</code> fails the build, so streaming is
      also how you opt a part into per-request rendering.
    </li>
    <li>
      <strong>Some browsers buffer small responses.</strong> A response under
      about 1024 bytes may not appear streamed in some browsers; real pages are
      usually larger.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is streaming SSR and why does it help?",
    answer: (
      <p>
        The server sends the page in chunks: the shell first, then each slow
        part as it finishes. Users see content sooner (better perceived
        performance and TTFB) and slow data no longer blocks everything else.
      </p>
    ),
  },
  {
    question: "How do loading.tsx and Suspense relate?",
    answer: (
      <p>
        <code>loading.tsx</code> is a Suspense boundary that Next.js puts
        around the page and nested layouts of that segment, with your file as
        the fallback. A manual <code>&lt;Suspense&gt;</code> does the same for
        any part of a component tree.
      </p>
    ),
  },
  {
    question: "Why does a streamed not-found page return 200?",
    answer: (
      <p>
        The HTTP status is sent with the headers, which are sent before the
        streamed body. Once streaming starts it cannot change, so Next.js marks
        the page <code>noindex</code> in the HTML. If you need a 404 status,
        check existence before streaming begins.
      </p>
    ),
  },
  {
    question: "What is the difference between one Suspense boundary and several?",
    answer: (
      <p>
        With several, each part appears when it is ready. With one around
        several children, they render in parallel but are revealed together
        when the slowest finishes. The demo measures both.
      </p>
    ),
  },
  {
    question: "Does streaming hurt SEO?",
    answer: (
      <p>
        No. It is server rendering, so crawlers receive the HTML. For bots that
        only read static HTML, Next.js resolves <code>generateMetadata</code>{" "}
        before streaming so metadata lands in the <code>&lt;head&gt;</code>.
      </p>
    ),
  },
];
