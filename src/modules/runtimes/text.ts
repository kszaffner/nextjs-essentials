import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

export type RuntimesText = {
  serverRender: { title: string; reading: string; where: string };
  table: { code: string; detail: string };
  probe: {
    title: string;
    button: string;
    failurePrefix: string;
    failed: string;
    headerMissing: string;
    handlerRow: string;
    proxyRow: string;
    proxyDetail: string;
  };
  detail: (nodeVersion: string, hasEdgeGlobal: boolean) => string;
  internals: {
    responsesTitle: string;
    responsesHint: string;
    files: { info: string; route: string; proxy: string };
  };
};

const text: Record<Locale, RuntimesText> = {
  en: {
    serverRender: { title: "Server render", reading: "Reading the runtime…", where: "Server Component render" },
    table: { code: "Code that ran", detail: "Detail" },
    probe: {
      title: "Ask the server where each piece runs",
      button: "Probe the route handler and the proxy",
      failurePrefix: "Could not probe the server:",
      failed: "The probe failed.",
      headerMissing: "(header missing)",
      handlerRow: "Route Handler (/api/runtimes/info)",
      proxyRow: "proxy.ts (x-demo-runtime header)",
      proxyDetail: "set on the response by proxy.ts",
    },
    detail: (nodeVersion, hasEdgeGlobal) => `node ${nodeVersion}, EdgeRuntime global: ${hasEdgeGlobal}`,
    internals: {
      responsesTitle: "Response headers (live)",
      responsesHint:
        "The proxy stamps every matched response with the runtime it executed in. Fetch the page and read x-demo-runtime: it is the same value the probe shows.",
      files: {
        info: "Where the answer comes from: NEXT_RUNTIME, the Node version, and whether the Edge-only EdgeRuntime global exists.",
        route: "The Route Handler that returns it, per request.",
        proxy: "proxy.ts: sets x-demo-runtime from process.env.NEXT_RUNTIME.",
      },
    },
  },
  pl: {
    serverRender: { title: "Render na serwerze", reading: "Odczyt runtime'u…", where: "Render Server Component" },
    table: { code: "Kod, który się wykonał", detail: "Szczegóły" },
    probe: {
      title: "Zapytaj serwer, gdzie działa każdy element",
      button: "Sprawdź Route Handler i proxy",
      failurePrefix: "Nie udało się zbadać serwera:",
      failed: "Sprawdzenie nie powiodło się.",
      headerMissing: "(brak nagłówka)",
      handlerRow: "Route Handler (/api/runtimes/info)",
      proxyRow: "proxy.ts (nagłówek x-demo-runtime)",
      proxyDetail: "ustawione w odpowiedzi przez proxy.ts",
    },
    detail: (nodeVersion, hasEdgeGlobal) => `node ${nodeVersion}, globalna EdgeRuntime: ${hasEdgeGlobal}`,
    internals: {
      responsesTitle: "Nagłówki odpowiedzi (na żywo)",
      responsesHint:
        "Proxy oznacza każdą dopasowaną odpowiedź runtime'em, w którym się wykonało. Pobierz stronę i przeczytaj x-demo-runtime: to ta sama wartość, którą pokazuje sprawdzenie.",
      files: {
        info: "Skąd bierze się odpowiedź: NEXT_RUNTIME, wersja Node i to, czy istnieje globalna EdgeRuntime tylko z Edge.",
        route: "Route Handler, który ją zwraca, per żądanie.",
        proxy: "proxy.ts: ustawia x-demo-runtime z process.env.NEXT_RUNTIME.",
      },
    },
  },
};

export function getRuntimesText(locale: Locale): RuntimesText {
  return text[locale];
}

export function getRuntimesInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: ["/advanced-routing/runtimes/demo"],
      headerNames: ["x-demo-runtime", "x-demo-proxy"],
    },
    files: [
      { path: "src/modules/runtimes/server/runtimeInfo.ts", note: internals.files.info },
      { path: "src/app/api/runtimes/info/route.ts", note: internals.files.route },
      { path: "src/proxy.ts", note: internals.files.proxy },
    ],
  };
}
