import { NextResponse, type NextRequest } from "next/server";
import { VARIANT_COOKIE_NAME, decideProxyAction } from "@/modules/proxy";

// Runs before the cache and before any route renders, on the Node.js runtime.
export function proxy(request: NextRequest) {
  const action = decideProxyAction({
    pathname: request.nextUrl.pathname,
    variantCookie: request.cookies.get(VARIANT_COOKIE_NAME)?.value,
    randomValue: Math.random(),
  });

  // Pass information to the app through a request header, so a Server
  // Component can see what the proxy decided.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-demo-proxy-decision", action.type);
  const forwarded = { request: { headers: requestHeaders } };

  const response = buildResponse(request, action, forwarded);
  response.headers.set("x-demo-proxy", "ran");
  // Which runtime executed this proxy (the runtimes topic reads it).
  response.headers.set("x-demo-runtime", process.env.NEXT_RUNTIME ?? "unknown");
  return response;
}

function buildResponse(
  request: NextRequest,
  action: ReturnType<typeof decideProxyAction>,
  forwarded: { request: { headers: Headers } },
): NextResponse {
  switch (action.type) {
    case "redirect":
      return NextResponse.redirect(new URL(action.destination, request.url));

    case "rewrite": {
      const response = NextResponse.rewrite(new URL(action.destination, request.url), forwarded);
      if (action.assignVariant) {
        response.cookies.set(VARIANT_COOKIE_NAME, action.assignVariant, { path: "/", sameSite: "lax" });
      }
      return response;
    }

    case "respond":
      return new NextResponse(action.body, { status: action.status });

    case "continue":
      return NextResponse.next(forwarded);

    default: {
      const unreachable: never = action;
      return unreachable;
    }
  }
}

// Without a matcher the proxy would run for every request, including static
// assets. List exactly what it should see.
export const config = {
  matcher: ["/advanced-routing/proxy/demo/:path*", "/advanced-routing/runtimes/demo"],
};
