import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";
import { PROXY_DEMO_BASE } from "./decideProxyAction";

type DestinationKind = "redirectTarget" | "rewriteTarget" | "variantA" | "variantB";

type ProxyText = {
  demo: {
    title: string;
    open: string;
    behavior: string;
    links: Record<"old" | "alias" | "personalized" | "blocked", { title: string; effect: string }>;
    footerBetween: string;
    footerAfter: string;
  };
  destinations: Record<DestinationKind, { title: string; description: string }>;
  report: { prefix: string; none: string; reading: string; back: string };
  internals: {
    responsesTitle: string;
    responsesHint: string;
    files: { proxy: string; decision: string };
  };
};

const text: Record<Locale, ProxyText> = {
  en: {
    demo: {
      title: "What the proxy does to each URL",
      open: "Open",
      behavior: "Behavior",
      links: {
        old: { title: "Redirect", effect: "The proxy answers 307 and the browser lands on /new." },
        alias: { title: "Rewrite", effect: "The URL stays /alias; the content comes from /target." },
        personalized: {
          title: "Personalize",
          effect: "A rewrite to variant A or B, chosen by a cookie the proxy sets on the first visit.",
        },
        blocked: { title: "Respond directly", effect: "The proxy returns 403 itself; no route runs." },
      },
      footerBetween: "and",
      footerAfter: "are ordinary pages that report what the proxy told them.",
    },
    destinations: {
      redirectTarget: {
        title: "Redirect target (/new)",
        description: "You were redirected here: the browser's URL changed.",
      },
      rewriteTarget: {
        title: "Rewrite target (/target)",
        description: "You opened /alias; the proxy rewrote it here and the URL did not change.",
      },
      variantA: { title: "Variant A", description: "The proxy rewrote /personalized to this page for variant A." },
      variantB: { title: "Variant B", description: "The proxy rewrote /personalized to this page for variant B." },
    },
    report: {
      prefix: "proxy decision seen by this page:",
      none: "(no proxy ran for this request)",
      reading: "Reading the proxy decision…",
      back: "Back to the proxy demo",
    },
    internals: {
      responsesTitle: "Response headers (live)",
      responsesHint:
        "Each path is fetched from the browser and passes through the proxy first. x-demo-proxy proves it ran, x-demo-runtime says where; the 403 comes from the proxy itself. (Set-Cookie is hidden from page scripts, look for it in the Network tab.)",
      files: {
        proxy: "proxy.ts: turns the decision into a redirect, a rewrite, or a direct response, and adds the demo headers.",
        decision: "The decisions as a pure function: no request needed, so it is unit tested.",
      },
    },
  },
  pl: {
    demo: {
      title: "Co proxy robi z każdym URL",
      open: "Otwórz",
      behavior: "Zachowanie",
      links: {
        old: { title: "Redirect", effect: "Proxy odpowiada 307, a przeglądarka ląduje na /new." },
        alias: { title: "Rewrite", effect: "URL zostaje /alias; treść pochodzi z /target." },
        personalized: {
          title: "Personalizacja",
          effect: "Rewrite na wariant A lub B, wybrany przez cookie, które proxy ustawia przy pierwszej wizycie.",
        },
        blocked: { title: "Odpowiedź bezpośrednia", effect: "Proxy samo zwraca 403; żadna trasa się nie wykonuje." },
      },
      footerBetween: "i",
      footerAfter: "to zwykłe strony, które raportują, co powiedziało im proxy.",
    },
    destinations: {
      redirectTarget: {
        title: "Cel przekierowania (/new)",
        description: "Przekierowano cię tutaj: URL w przeglądarce się zmienił.",
      },
      rewriteTarget: {
        title: "Cel rewrite'u (/target)",
        description: "Otworzyłeś /alias; proxy przepisało go tutaj, a URL się nie zmienił.",
      },
      variantA: { title: "Wariant A", description: "Proxy przepisało /personalized na tę stronę dla wariantu A." },
      variantB: { title: "Wariant B", description: "Proxy przepisało /personalized na tę stronę dla wariantu B." },
    },
    report: {
      prefix: "decyzja proxy widziana przez tę stronę:",
      none: "(proxy nie działało dla tego żądania)",
      reading: "Odczyt decyzji proxy…",
      back: "Wróć do dema proxy",
    },
    internals: {
      responsesTitle: "Nagłówki odpowiedzi (na żywo)",
      responsesHint:
        "Każda ścieżka jest pobierana z przeglądarki i najpierw przechodzi przez proxy. x-demo-proxy dowodzi, że działało, x-demo-runtime mówi gdzie; 403 pochodzi od samego proxy. (Set-Cookie jest ukryte przed skryptami strony, szukaj go w zakładce Network.)",
      files: {
        proxy: "proxy.ts: zamienia decyzję w redirect, rewrite lub odpowiedź bezpośrednią i dodaje nagłówki demo.",
        decision: "Decyzje jako czysta funkcja: żądanie niepotrzebne, więc jest testowana jednostkowo.",
      },
    },
  },
};

export function getProxyText(locale: Locale): ProxyText {
  return text[locale];
}

export function getProxyInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: [`${PROXY_DEMO_BASE}/alias`, `${PROXY_DEMO_BASE}/personalized`, `${PROXY_DEMO_BASE}/blocked`],
      headerNames: ["x-demo-proxy", "x-demo-runtime", "x-nextjs-rewrite"],
    },
    files: [
      { path: "src/proxy.ts", note: internals.files.proxy },
      { path: "src/modules/proxy/decideProxyAction.ts", note: internals.files.decision },
    ],
  };
}

export type { DestinationKind };
