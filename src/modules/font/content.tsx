import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/optimization/font/demo";

export const basics = (
  <>
    <p>
      <code>next/font</code> loads web fonts with no request to a font service
      and, by design, no layout shift. For Google fonts, the files are downloaded{" "}
      <strong>at build time</strong> and served from your own domain; for your own
      files, <code>next/font/local</code> does the same.
    </p>
    <pre>
      <code>{`import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

<div className={lora.variable}>…</div>      // then: font-family: var(--font-lora)`}</code>
    </pre>
    <p>
      The root layout already loads Geist this way. The{" "}
      <LocalizedLink href={demoHref}>demo</LocalizedLink> adds Lora on that one page, and a button
      lists the font faces the browser knows. Observed on a production build:
    </p>
    <ul>
      <li>
        the HTML contains <strong>no reference to Google</strong>; the fonts are{" "}
        <code>/_next/static/media/…woff2</code> files from this site, served with{" "}
        <code>Cache-Control: public, max-age=31536000, immutable</code>;
      </li>
      <li>
        the CSS has <code>@font-face</code> rules with <code>font-display: swap</code>,
        a variable weight range (<code>100 900</code> for Geist), and a{" "}
        <code>unicode-range</code> per subset;
      </li>
      <li>
        a size-adjusted fallback is generated: <code>Geist Fallback</code> uses{" "}
        <code>local(Arial)</code> with <code>size-adjust: 104.76%</code> and
        matching ascent, descent, and line-gap overrides, so the text does not
        move when the real font arrives.
      </li>
    </ul>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Preloading is per page, via a Link header.</strong> The fonts are
      preloaded with an HTTP <code>Link: …; rel=preload; as=&quot;font&quot;</code>{" "}
      header, not a tag in the HTML. A regular page carried two (Geist and Geist
      Mono); the font demo carried three, because Lora is imported only there.
      A font nobody imports on a page costs that page nothing.
    </li>
    <li>
      <strong>Options must be literals.</strong> Passing a variable fails the
      build: <em>&quot;Font loader values must be explicitly written
      literals.&quot;</em> The loader is analyzed at build time, not run.
    </li>
    <li>
      <strong>Loaders live at the top of a module.</strong> Calling{" "}
      <code>Lora(…)</code> inside a component fails with{" "}
      <em>&quot;Font loaders must be called and assigned to a const in the module
      scope.&quot;</em> Define it once and import the result.
    </li>
    <li>
      <strong>Subsets decide what is downloaded and preloaded.</strong> Declare
      the subsets you need (<code>latin</code>); the CSS still lists the others
      with <code>unicode-range</code>, so a browser fetches one only when a
      character needs it.
    </li>
    <li>
      <strong>Variable fonts need no weight.</strong> A variable font covers a
      range (<code>400 700</code> for Lora), so one file serves every weight;
      static fonts need each <code>weight</code> listed, and each is a separate
      file.
    </li>
    <li>
      <strong>swap shows a fallback first.</strong> With{" "}
      <code>font-display: swap</code> the text appears immediately in the
      fallback and swaps when the font loads; the size-adjusted fallback keeps
      that swap from shifting the layout, but the glyphs still change shape.
    </li>
    <li>
      <strong>Scope the font where it is used.</strong> Apply{" "}
      <code>variable</code> on the smallest wrapper that needs it, as the demo
      does, rather than on <code>&lt;html&gt;</code>, unless every page uses it.
    </li>
    <li>
      <strong>Self-hosting is a privacy and reliability choice.</strong> No
      third-party request is made by visitors, and the fonts cache like any
      other static asset.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What does next/font do differently from a <link> to Google Fonts?",
    answer: (
      <p>
        It downloads the font files at build time and self-hosts them, so
        visitors make no request to Google, the files cache as immutable static
        assets, and it generates a size-adjusted fallback font to avoid layout
        shift.
      </p>
    ),
  },
  {
    question: "How does next/font avoid layout shift?",
    answer: (
      <p>
        It creates a fallback <code>@font-face</code> (for example{" "}
        <code>Geist Fallback</code> built on a system font) with{" "}
        <code>size-adjust</code> and ascent, descent, and line-gap overrides
        matched to the real font, so text takes the same space before and after
        the swap.
      </p>
    ),
  },
  {
    question: "Why must font loader options be literals and the call at module scope?",
    answer: (
      <p>
        Next.js evaluates the loader at build time to download and subset the
        font, so it cannot run your code or depend on runtime values. Violations
        are build errors with explicit messages.
      </p>
    ),
  },
  {
    question: "How are fonts preloaded?",
    answer: (
      <p>
        Next.js adds an HTTP <code>Link</code> preload header for the declared
        subsets of every font imported by the page. A font imported on only one
        page is preloaded only there.
      </p>
    ),
  },
  {
    question: "What is the difference between next/font/google and next/font/local?",
    answer: (
      <p>
        Both self-host and generate fallback metrics. Google downloads the files
        from Google Fonts at build time; local takes font files from your
        repository (a <code>src</code> path relative to the file).
      </p>
    ),
  },
];
