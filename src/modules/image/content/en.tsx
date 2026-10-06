import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/optimization/image/demo";

export const basics = (
  <>
    <p>
      <code>&lt;Image&gt;</code> (from <code>next/image</code>) renders an{" "}
      <code>&lt;img&gt;</code> and handles the parts that are easy to get wrong:
      resizing, modern formats, lazy loading, and reserving space.
    </p>
    <CodeBlock code={`<Image
  src="/demo/hero.jpg"
  alt="..."
  width={1600} height={900}      // reserves space: no layout shift
  sizes="(min-width: 60rem) 40rem, 100vw"   // how wide it will really be
  preload                         // only for the LCP image
/>`} />
    <ul>
      <li>
        It builds a <code>srcset</code> of URLs like{" "}
        <code>/_next/image?url=…&amp;w=640&amp;q=75</code>. The browser picks one
        using <code>sizes</code> and the screen density; Next.js resizes and
        converts it on demand and caches the result.
      </li>
      <li>
        Images are <strong>lazy by default</strong> (<code>loading=&quot;lazy&quot;</code>).
        The one that is the Largest Contentful Paint element should instead load
        early, with <code>preload</code> (which replaces the deprecated{" "}
        <code>priority</code>).
      </li>
      <li>
        <code>fill</code> makes the image cover a positioned parent, for when you
        do not know its size.
      </li>
    </ul>
    <p>
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> has a hero with <code>preload</code>,
      a gallery far below the fold, and a <code>fill</code> image. Observed on a
      production build:
    </p>
    <ul>
      <li>
        the hero has a <code>&lt;link rel=&quot;preload&quot; as=&quot;image&quot;&gt;</code> in
        the head and no <code>loading=&quot;lazy&quot;</code>; the gallery and{" "}
        <code>fill</code> images have <code>loading=&quot;lazy&quot;</code>;
      </li>
      <li>
        the original 1600×900 JPEG is 121,566 bytes; the 640 px candidate is a{" "}
        <strong>5,928-byte WebP</strong> and the 1080 px one a 10,358-byte WebP.
      </li>
    </ul>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>The format follows the Accept header.</strong> The same request
      returned <code>image/webp</code> for a browser that accepts it and a
      19,041-byte <code>image/jpeg</code> for one that only accepts JPEG, with{" "}
      <code>Vary: Accept</code>. AVIF was <em>not</em> served when requested:
      only WebP is enabled by default.
    </li>
    <li>
      <strong>The endpoint only serves what you configured.</strong> A width of
      999 was refused (<em>&quot;&apos;w&apos; parameter (width) of 999 is not
      allowed&quot;</em>), a quality of 50 too (<em>&quot;&apos;q&apos; parameter
      (quality) of 50 is not allowed&quot;</em>, only 75 is allowed by default),
      a remote URL was refused (<em>&quot;&apos;url&apos; parameter is not
      allowed&quot;</em>) until you list it in <code>remotePatterns</code>, and a
      file that is not an image gets a 400. This stops anyone using your server
      as a free image resizer.
    </li>
    <li>
      <strong>Results are cached for hours.</strong> A variant came back with{" "}
      <code>Cache-Control: public, max-age=14400, must-revalidate</code> (four
      hours) and was a cache hit the second time.
    </li>
    <li>
      <strong>
        <code>sizes</code> decides which file is downloaded.
      </strong>{" "}
      Without it the browser assumes the image is as wide as the viewport and may
      fetch a far larger file than needed. With it, the candidates in the{" "}
      <code>srcset</code> change: the hero (<code>100vw</code> on small screens)
      listed 640 px and up, while the gallery (about a third of the width) also
      listed 256 and 384 px.
    </li>
    <li>
      <strong>Width and height are not the displayed size.</strong> They are the
      intrinsic size, used to compute the aspect ratio and reserve space so the
      page does not shift. Control the displayed size with CSS (the demo uses{" "}
      <code>width: 100%; height: auto</code>).
    </li>
    <li>
      <strong>Only one image should be preloaded.</strong> Preload the single
      image that is certainly the LCP element. Several preloaded images compete,
      and the docs recommend <code>loading=&quot;eager&quot;</code> or{" "}
      <code>fetchPriority=&quot;high&quot;</code> in most other cases.
    </li>
    <li>
      <strong>Lazy loading is the browser&apos;s decision.</strong> The attribute
      is what Next.js controls; browsers start fetching a lazy image before it is
      visible, with a margin that depends on the browser and connection. In the
      automated browser used to check this demo, images 4,600 px below the fold
      were fetched immediately, so judge it in DevTools&apos; Network panel in a
      real browser.
    </li>
    <li>
      <strong>
        <code>fill</code> needs a sized, positioned parent.
      </strong>{" "}
      The parent must have <code>position</code> and a height (the demo uses an
      aspect ratio), and an <code>sizes</code> value too, or the full-width
      candidate is downloaded.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What does next/image do for you?",
    answer: (
      <p>
        It resizes and converts images on demand (WebP by default), builds a{" "}
        <code>srcset</code> so the browser downloads the right size, lazy loads
        by default, and uses <code>width</code>/<code>height</code> to reserve
        space and avoid layout shift. Results are cached.
      </p>
    ),
  },
  {
    question: "Which image should get preload, and why only one?",
    answer: (
      <p>
        The Largest Contentful Paint image, usually the hero above the fold:
        preloading adds a <code>&lt;link rel=&quot;preload&quot;&gt;</code> to the
        head so the fetch starts early. Preloading several images makes them
        compete and hurts the LCP you are trying to improve.
      </p>
    ),
  },
  {
    question: "What does sizes do?",
    answer: (
      <p>
        It tells the browser how wide the image will be at each breakpoint, so it
        can pick the right <code>srcset</code> candidate before layout. Without
        it the browser assumes the full viewport width and may download an image
        much larger than it will be shown.
      </p>
    ),
  },
  {
    question: "Why do width and height matter if CSS sets the size?",
    answer: (
      <p>
        They give the browser the aspect ratio before the file loads, so it
        reserves the space and the content does not jump when the image appears
        (Cumulative Layout Shift). CSS then scales the box.
      </p>
    ),
  },
  {
    question: "How do you use images from another domain?",
    answer: (
      <p>
        List the host in <code>images.remotePatterns</code>. Without it the
        optimization endpoint refuses the URL, which protects your server from
        being used to process arbitrary images.
      </p>
    ),
  },
  {
    question: "Where does the optimized image come from, and how long is it kept?",
    answer: (
      <p>
        From <code>/_next/image</code>: Next.js reads the original, resizes and
        converts it for the request&apos;s <code>Accept</code> header, and caches
        the result (four hours by default, then revalidated).
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "next/image",
  summary: "Lazy loading, srcset, priority, and LCP.",
  basics,
  edgeCases,
  interviewQuestions,
};
