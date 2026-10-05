import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type FetchExtensionsText = {
  loading: string;
  originMissing: string;
  columns: { options: string; hits: string; servedAt: string };
  memoizedRow: string;
  and: string;
  hint: string;
  internals: {
    responsesTitle: string;
    responsesHint: string;
    files: { client: string; api: string; action: string };
  };
};

const text: Record<Locale, FetchExtensionsText> = {
  en: {
    loading: "Calling the demo API…",
    originMissing: "This demo calls the app's own API. Set SITE_ORIGIN to this site's URL to enable it.",
    columns: { options: "fetch() options", hits: "API hits", servedAt: "served at" },
    memoizedRow: "same URL twice in one render",
    and: "and",
    hint: 'Reload: rows whose "API hits" keep growing hit the API every time; rows that stay put are served from the cache.',
    internals: {
      responsesTitle: "Response headers (live)",
      responsesHint:
        "The page itself is rendered per request (it waits for connection()), so it is not served from a shared cache; the fetch results above are what the Data Cache holds.",
      files: {
        client: "The six fetch() variants: the options object is the only difference between the rows.",
        api: "The demo API: its counter grows only when a request really reaches it.",
        action: "revalidateTag with the max profile: marks the tagged entries stale.",
      },
    },
  },
  pl: {
    loading: "Wywoływanie demonstracyjnego API…",
    originMissing: "To demo wywołuje własne API aplikacji. Ustaw SITE_ORIGIN na URL tej strony, by je włączyć.",
    columns: { options: "opcje fetch()", hits: "trafienia API", servedAt: "podano o" },
    memoizedRow: "ten sam URL dwa razy w jednym renderze",
    and: "i",
    hint: 'Przeładuj: wiersze, w których „trafienia API" ciągle rosną, uderzają w API za każdym razem; te, które stoją w miejscu, są serwowane z cache.',
    internals: {
      responsesTitle: "Nagłówki odpowiedzi (na żywo)",
      responsesHint:
        "Sama strona jest renderowana per żądanie (czeka na connection()), więc nie jest serwowana ze współdzielonego cache; to wyniki fetchy powyżej trzyma Data Cache.",
      files: {
        client: "Sześć wariantów fetch(): obiekt opcji to jedyna różnica między wierszami.",
        api: "Demonstracyjne API: jego licznik rośnie tylko wtedy, gdy żądanie naprawdę do niego dotrze.",
        action: "revalidateTag z profilem max: oznacza wpisy z tagiem jako nieaktualne.",
      },
    },
  },
};

export function getFetchExtensionsText(locale: Locale): FetchExtensionsText {
  return text[locale];
}

export function getFetchExtensionsInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: ["/data/fetch-extensions/demo"],
      headerNames: ["cache-control", "x-nextjs-cache", "age"],
    },
    files: [
      { path: "src/modules/fetch-extensions/server/clockClient.ts", note: internals.files.client },
      { path: "src/app/api/fetch-extensions/clock/route.ts", note: internals.files.api },
      { path: "src/modules/fetch-extensions/server/actions.ts", note: internals.files.action },
    ],
  };
}
