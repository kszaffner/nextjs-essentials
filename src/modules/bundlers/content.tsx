import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/optimization/bundlers/demo";

export const basics = (
  <>
    <p>
      A bundler turns your modules into the files a browser (and the server) can
      run. Next.js 16 uses <strong>Turbopack</strong> by default for{" "}
      <code>dev</code> and <code>build</code>; <strong>Webpack</strong> is an
      opt-in with the <code>--webpack</code> flag. The mental model of Turbopack,
      from the docs:
    </p>
    <ul>
      <li>
        <strong>One unified graph</strong> for the client and server
        environments, instead of separate compilers stitched together.
      </li>
      <li>
        <strong>Incremental computation:</strong> work is cached down to the
        function level and persisted to disk between runs, so it is not repeated.
      </li>
      <li>
        <strong>Lazy bundling in dev:</strong> only what the dev server is asked
        for is bundled, which cuts start-up time and memory.
      </li>
      <li>
        <strong>Bundling in dev, not native ESM:</strong> it bundles, in an
        optimized way, so large apps do not drown in network requests.
      </li>
    </ul>
    <p>
      The same project, built both ways on this machine (one run each unless
      noted; the numbers are indicative, not a benchmark):
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col" />
          <th scope="col">Turbopack</th>
          <th scope="col">Webpack</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <code>next build</code> time
          </th>
          <td>16 to 17 s (two runs)</td>
          <td>94 s (a later run: 75 s)</td>
        </tr>
        <tr>
          <th scope="row">Client JavaScript files</th>
          <td>44</td>
          <td>155</td>
        </tr>
        <tr>
          <th scope="row">Client JavaScript, raw</th>
          <td>1.37 MB</td>
          <td>1.75 MB</td>
        </tr>
        <tr>
          <th scope="row">Client JavaScript, gzip</th>
          <td>382 KB</td>
          <td>509 KB</td>
        </tr>
      </tbody>
    </table>
    <p>
      Both succeeded with Sentry and the React Compiler enabled. The{" "}
      <LocalizedLink href={demoHref}>demo</LocalizedLink> shows which bundler produced the build you
      are looking at; the commands to switch are on the same page.
    </p>
    <CodeBlock title="package.json" language="json" code={`
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:webpack": "next build --webpack",
    "analyze": "next experimental-analyze"
  }
}
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Webpack-only configuration is not honored.</strong> A{" "}
      <code>webpack()</code> function in <code>next.config</code>, webpack
      plugins, and some legacy CSS Modules features are among the documented
      gaps. If you depend on them, you build with <code>--webpack</code>.
    </li>
    <li>
      <strong>Output differs, not just speed.</strong> The two bundlers split
      code differently (44 versus 155 client files here), order CSS Modules
      differently, and print numbers differently: the docs show{" "}
      <code>line-height: 1.4705882353</code> from Webpack against{" "}
      <code>1.47059</code> from Turbopack. Compare on the same bundler.
    </li>
    <li>
      <strong>Other documented gaps:</strong> Sass imports from{" "}
      <code>node_modules</code> behave differently, Yarn Plug&apos;n&apos;Play and{" "}
      <code>experimental.urlImports</code> are unsupported, and some experimental
      flags are not available.
    </li>
    <li>
      <strong>The tooling follows the bundler.</strong>{" "}
      <code>next experimental-analyze</code> (see the Web Vitals topic) works
      only with Turbopack, and the dev server&apos;s caching and Fast Refresh
      are Turbopack features.
    </li>
    <li>
      <strong>Know which one built the app.</strong> The demo reads{" "}
      <code>process.env.TURBOPACK</code>, which Next.js inlines at build time. It
      is not documented, so it is a curiosity here and not an API to build
      features on; the build log is the reliable source.
    </li>
    <li>
      <strong>Switching is a flag, not a rewrite.</strong> The same source built
      with either (<code>next build --webpack</code> versus the default), so
      comparing or falling back is cheap.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is Turbopack and why is it the default?",
    answer: (
      <p>
        Next.js&apos;s Rust-based bundler. It uses one graph for all
        environments, caches work at the function level (persisted to disk), and
        bundles lazily in development, which makes dev start-up and builds much
        faster. It is the default for <code>next dev</code> and{" "}
        <code>next build</code>.
      </p>
    ),
  },
  {
    question: "How do you use Webpack instead, and why would you?",
    answer: (
      <p>
        Pass <code>--webpack</code> to <code>next dev</code> or{" "}
        <code>next build</code>. You would when you rely on something Turbopack
        does not support, such as a <code>webpack()</code> config, custom
        webpack plugins, or Yarn PnP.
      </p>
    ),
  },
  {
    question: "Is the output of the two bundlers interchangeable?",
    answer: (
      <p>
        Functionally yes, but not byte for byte: chunking, CSS ordering, and
        generated numbers differ. On this project the Turbopack build had 44
        client files and 382 KB gzipped, the Webpack build 155 and 509 KB.
      </p>
    ),
  },
  {
    question: "Which tools only work with Turbopack?",
    answer: (
      <p>
        The built-in bundle analyzer, <code>next experimental-analyze</code>.
        Webpack projects have used <code>@next/bundle-analyzer</code> instead.
      </p>
    ),
  },
  {
    question: "How would you decide whether to move off Webpack?",
    answer: (
      <p>
        List what depends on webpack-specific configuration, build with the
        default, and compare the app and the output. If nothing relies on the
        documented gaps, the default is faster; if something does, keep{" "}
        <code>--webpack</code> until it can be replaced.
      </p>
    ),
  },
];
