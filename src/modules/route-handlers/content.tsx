import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/advanced-routing/route-handlers/demo";

export const basics = (
  <>
    <p>
      A <strong>Route Handler</strong> is a <code>route.ts</code> file that
      exports a function per HTTP method (<code>GET</code>, <code>POST</code>,{" "}
      <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>,{" "}
      <code>HEAD</code>, <code>OPTIONS</code>). It is the lowest-level routing
      primitive: it takes a request and returns a response, with no layouts and
      no client-side navigation.
    </p>
    <CodeBlock code={`export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit");
  return NextResponse.json({ notes }, { status: 200 });
}

export async function GET(_request: NextRequest, context: RouteContext<"/api/notes/[id]">) {
  const { id } = await context.params;     // params is a Promise
}`} />
    <p>
      <code>NextRequest</code> and <code>NextResponse</code> extend the web{" "}
      <code>Request</code> and <code>Response</code> with helpers such as{" "}
      <code>nextUrl.searchParams</code>, <code>cookies</code>, and{" "}
      <code>NextResponse.json()</code>. Use the <LocalizedLink href={demoHref}>demo</LocalizedLink>{" "}
      console to see the status codes this notes API returns:
    </p>
    <ul>
      <li>
        <code>200</code> for a read, <code>201</code> with a{" "}
        <code>Location</code> header for a create, <code>204</code> with no body
        for a delete.
      </li>
      <li>
        <code>400</code> for malformed JSON or a bad query, <code>422</code> for
        a body that parses but breaks the rules, <code>404</code> for an
        unknown id, <code>415</code> for the wrong content type.
      </li>
      <li>
        <code>405</code> for a method the file does not export.
      </li>
    </ul>
    <p>
      Every error uses one shape, <code>{"{ code, message, details? }"}</code>,
      so a caller can handle failures without parsing prose.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        No <code>page.tsx</code> beside a <code>route.ts</code>.
      </strong>{" "}
      They would both own the same URL, so it is a conflict; that is why the
      APIs live under <code>app/api</code>.
    </li>
    <li>
      <strong>Unsupported methods are answered for you.</strong> A{" "}
      <code>PUT</code> to a file that only exports <code>GET</code> and{" "}
      <code>POST</code> returned <code>405</code>. <code>HEAD</code> worked and{" "}
      <code>OPTIONS</code> returned <code>204</code> with{" "}
      <code>allow: GET, HEAD, OPTIONS, POST</code> without any code.
    </li>
    <li>
      <strong>No built-in CSRF protection.</strong> Server Actions compare the{" "}
      <code>Origin</code> header with the host; Route Handlers do not. A POST
      with <code>Origin: http://evil.example</code> was accepted (201). The demo
      requires <code>Content-Type: application/json</code> (anything else gets{" "}
      <code>415</code>), which forces browsers to preflight a cross-site
      request. Anything authenticated by cookies needs its own protection.
    </li>
    <li>
      <strong>Validate every input.</strong> Query strings are strings:{" "}
      <code>?limit=abc</code> is parsed with a schema and rejected with{" "}
      <code>400</code>. A body is parsed twice: <code>request.json()</code> can
      throw (malformed JSON, <code>400</code>), then a schema checks the shape (
      <code>422</code>).
    </li>
    <li>
      <strong>Caching follows the page model.</strong> With Cache Components, a{" "}
      <code>GET</code> handler that touches no runtime or uncached data can be
      prerendered; one whose data changes must run per request. The demo calls{" "}
      <code>connection()</code> so it never freezes at build time, and the
      build output marks it <code>ƒ</code>. Other methods are never cached.
    </li>
    <li>
      <strong>Memoization does not apply.</strong> Identical{" "}
      <code>fetch</code> calls inside a handler are not deduplicated the way
      they are during a component render.
    </li>
    <li>
      <strong>A body can be read once.</strong>{" "}
      <code>request.json()</code> consumes the stream; clone the request if two
      places need it.
    </li>
    <li>
      <strong>An uncaught throw becomes a bare 500.</strong> Catch what you can
      act on and return a structured error (see the error-handling topic).
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What is a Route Handler and when would you use one?",
    answer: (
      <p>
        A <code>route.ts</code> file exporting a function per HTTP method,
        returning a <code>Response</code>. Use it for public APIs, webhooks,
        and anything that is not UI. For form submissions and mutations from
        your own UI, a Server Action is usually simpler.
      </p>
    ),
  },
  {
    question: "Why can't a route.ts and a page.tsx share a segment?",
    answer: (
      <p>
        Each takes over all HTTP verbs for its URL, so they conflict. Put
        handlers under a path such as <code>app/api/…</code>.
      </p>
    ),
  },
  {
    question: "Which status code for which failure?",
    answer: (
      <p>
        <code>400</code> malformed request, <code>422</code> well-formed but
        invalid data, <code>401</code>/<code>403</code> authentication and
        authorization, <code>404</code> unknown resource, <code>405</code>{" "}
        method not allowed, <code>409</code> a conflict with current state,{" "}
        <code>415</code> unsupported content type, <code>500</code> an
        unexpected server error (with a generic message).
      </p>
    ),
  },
  {
    question: "Are Route Handlers protected against CSRF like Server Actions?",
    answer: (
      <p>
        No. Server Actions check the <code>Origin</code> header against the
        host; Route Handlers do not. Require a non-simple content type or a
        token header, and do not rely on cookies alone for state-changing
        endpoints.
      </p>
    ),
  },
  {
    question: "Are Route Handlers cached?",
    answer: (
      <p>
        Not by default for anything that reads runtime data. With Cache
        Components a <code>GET</code> follows the page rules: it can be
        prerendered if it uses no runtime or uncached data, or call{" "}
        <code>connection()</code> / read the request to keep it per request.
        Other methods are never cached.
      </p>
    ),
  },
  {
    question: "How do you read dynamic route params in a handler?",
    answer: (
      <p>
        The second argument is a context whose <code>params</code> is a
        Promise: <code>await context.params</code>. Type it with the global{" "}
        <code>RouteContext&lt;&quot;/api/notes/[id]&quot;&gt;</code> helper.
      </p>
    ),
  },
];
