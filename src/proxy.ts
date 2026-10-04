import { NextResponse, type NextRequest } from "next/server";
import { VARIANT_COOKIE_NAME, decideProxyAction } from "@/modules/proxy";
import { localeCookieName, localizePath, resolveLocaleRedirect, splitLocale, type Locale } from "@/shared/i18n";

// Runs before the cache and before any route renders, on the Node.js runtime.
export function proxy(request: NextRequest) {
  // Language first: a path without a locale prefix goes to /pl (or to the
  // language remembered in a cookie) before anything else looks at it.
  const localeRedirect = resolveLocaleRedirect({
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
    cookieLocale: request.cookies.get(localeCookieName)?.value,
  });
  if (localeRedirect) {
    return NextResponse.redirect(new URL(localeRedirect, request.url));
  }

  const { locale, path } = splitLocale(request.nextUrl.pathname);
  const action = decideProxyAction({
    pathname: path,
    variantCookie: request.cookies.get(VARIANT_COOKIE_NAME)?.value,
    randomValue: Math.random(),
  });

  // Pass information to the app through a request header, so a Server
  // Component can see what the proxy decided.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-demo-proxy-decision", action.type);
  const forwarded = { request: { headers: requestHeaders } };

  const response = buildResponse(request, action, forwarded, locale ?? "pl");
  response.headers.set("x-demo-proxy", "ran");
  // Which runtime executed this proxy (the runtimes topic reads it).
  response.headers.set("x-demo-runtime", process.env.NEXT_RUNTIME ?? "unknown");
  if (locale && request.cookies.get(localeCookieName)?.value !== locale) {
    response.cookies.set(localeCookieName, locale, { path: "/", sameSite: "lax" });
  }
  return response;
}

function buildResponse(
  request: NextRequest,
  action: ReturnType<typeof decideProxyAction>,
  forwarded: { request: { headers: Headers } },
  locale: Locale,
): NextResponse {
  switch (action.type) {
    case "redirect":
      return NextResponse.redirect(new URL(localizePath(locale, action.destination), request.url));

    case "rewrite": {
      const response = NextResponse.rewrite(
        new URL(localizePath(locale, action.destination), request.url),
        forwarded,
      );
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

// Every page request needs the locale check, so the matcher skips only what
// has no language: internals, Route Handlers under /api, and files with an
// extension (favicon.ico, sitemap.xml, robots.txt).
export const config = {
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
