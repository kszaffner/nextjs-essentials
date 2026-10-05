import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/advanced-routing/runtimes/demo";

export const basics = (
  <>
    <p>
      Next.js has two server runtimes. The <strong>Node.js runtime</strong> is the
      default: all Node APIs, used for rendering. The{" "}
      <strong>Edge runtime</strong> is a smaller sandbox with a limited set of
      web APIs; it is now deprecated. Next.js tells you which one is executing
      through <code>process.env.NEXT_RUNTIME</code>.
    </p>
    <p>
      The <LocalizedLink href={demoHref}>demo</LocalizedLink> asks three pieces of this app where
      they run. On a production build every answer was{" "}
      <code>nodejs</code> (Node v22), and the <code>EdgeRuntime</code> global
      that only the Edge sandbox defines was absent:
    </p>
    <ul>
      <li>a Server Component render,</li>
      <li>
        a Route Handler (<code>/api/runtimes/info</code>),
      </li>
      <li>
        <code>proxy.ts</code>, via a response header it sets.
      </li>
    </ul>
    <table>
      <thead>
        <tr>
          <th scope="col">Code</th>
          <th scope="col">Runtime here</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Server Components, Server Actions, Route Handlers</td>
          <td>Node.js</td>
        </tr>
        <tr>
          <td>
            <code>proxy.ts</code>
          </td>
          <td>Node.js, always</td>
        </tr>
        <tr>
          <td>
            legacy <code>middleware.ts</code>
          </td>
          <td>Edge (deprecated file name)</td>
        </tr>
      </tbody>
    </table>
    <CodeBlock title="app/api/runtimes/info/route.ts" code={`
export async function GET() {
  return Response.json({
    // "nodejs" here; "edge" only inside the (deprecated) Edge sandbox.
    runtime: process.env.NEXT_RUNTIME,
    edgeGlobalPresent: typeof EdgeRuntime !== "undefined",
  });
}
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>export const runtime = &quot;edge&quot;</code> does not build.
      </strong>{" "}
      In a page or a Route Handler with Cache Components it fails with{" "}
      <em>
        &quot;Route segment config &quot;runtime&quot; is not compatible with
        `nextConfig.cacheComponents`. Please remove it.&quot;
      </em>{" "}
      Remove the export; Node.js is the default.
    </li>
    <li>
      <strong>Proxy refuses a runtime option.</strong> Exporting{" "}
      <code>runtime</code> from <code>proxy.ts</code> fails with{" "}
      <em>
        &quot;Route segment config is not allowed in Proxy file … Proxy always
        runs on Node.js runtime.&quot;
      </em>
    </li>
    <li>
      <strong>The old file name still means Edge.</strong> A{" "}
      <code>middleware.ts</code> built with the warning that the convention is
      deprecated and ran with <code>NEXT_RUNTIME=edge</code>. Renaming it to{" "}
      <code>proxy.ts</code> changes the runtime to Node.js, so check any Edge-only
      assumptions when you migrate.
    </li>
    <li>
      <strong>Edge is a subset.</strong> It does not support all Node APIs
      (some packages break) and does not support Incremental Static
      Regeneration. If a dependency needs <code>fs</code>, native modules, or a
      database driver, Node.js is the only option.
    </li>
    <li>
      <strong>Edge is no longer the way to get streaming or low latency.</strong>{" "}
      Both runtimes can stream, and the platform&apos;s Node.js functions (for
      example Vercel&apos;s Fluid Compute) are the recommended default.
    </li>
    <li>
      <strong>Check the runtime, do not assume it.</strong> Read{" "}
      <code>process.env.NEXT_RUNTIME</code> (as the demo does) when code must
      behave differently.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What are the two runtimes in Next.js?",
    answer: (
      <p>
        Node.js (the default, with all Node APIs, used for rendering) and the
        Edge runtime (a limited web-API sandbox, deprecated). You can tell
        which one is running from <code>process.env.NEXT_RUNTIME</code>.
      </p>
    ),
  },
  {
    question: "Which runtime does proxy.ts use?",
    answer: (
      <p>
        Always Node.js: it does not accept a <code>runtime</code> option, and
        exporting one is a build error. The deprecated{" "}
        <code>middleware.ts</code> ran on the Edge runtime.
      </p>
    ),
  },
  {
    question: "What happens if you set runtime = \"edge\" on a route?",
    answer: (
      <p>
        With Cache Components the build fails: the <code>runtime</code> route
        segment config is not compatible with <code>cacheComponents</code>.
        Remove it and run on Node.js.
      </p>
    ),
  },
  {
    question: "What are the limits of the Edge runtime?",
    answer: (
      <p>
        A restricted API surface (no full Node.js, so some packages fail) and no
        Incremental Static Regeneration. It is deprecated in favor of Node.js.
      </p>
    ),
  },
  {
    question: "How do you migrate middleware.ts safely?",
    answer: (
      <p>
        Run the codemod to rename it to <code>proxy.ts</code>, remove any{" "}
        <code>runtime</code> export, and re-check anything that assumed Edge
        (APIs available, timing). Keep the matcher, and verify behavior on a
        production build.
      </p>
    ),
  },
];
