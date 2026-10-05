import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type CacheLayersText = {
  openOther: string;
  rendering: string;
  otherIntro: string;
  otherLink: string;
  memoization: { title: string; hint: string; componentA: string; componentB: string; saw: string };
  serverCache: { title: string; hint: string; run: string; generatedAt: string };
  routerCache: { title: string; hint: string; renderedAt: string };
  internals: {
    responsesTitle: string;
    responsesHint: string;
    files: { counters: string; report: string; refresh: string };
  };
};

const text: Record<Locale, CacheLayersText> = {
  en: {
    openOther: "Open the other page",
    rendering: "Rendering on the server…",
    otherIntro: "Another page. Go back two ways and compare the timestamp:",
    otherLink: "Link to the layers page (a new navigation)",
    memoization: {
      title: "Request memoization (React.cache)",
      hint: "Two components asked for the same data in one render; the loader ran once, so both saw the same run. The number grows by one per request.",
      componentA: "Component A",
      componentB: "Component B",
      saw: "saw run",
    },
    serverCache: {
      title: 'Server cache ("use cache" + cacheLife("hours"))',
      hint: "The function body ran for run #N only when nothing fresh was cached. Reloading does not move it.",
      run: "run",
      generatedAt: "generated at",
    },
    routerCache: {
      title: "Client router cache",
      hint: "Open the other page, then return two ways. A Link is a new navigation: the page renders on the server again and this timestamp changes. router.back() or the browser back button restores the page you left, with the same timestamp, because visited routes are kept instead of re-rendered. A reload or router.refresh() changes it.",
      renderedAt: "this page rendered at",
    },
    internals: {
      responsesTitle: "Response headers (live)",
      responsesHint:
        "The first page is rendered per request; the second is static. Compare cache-control and x-nextjs-stale-time (the client cache lifetime in seconds, sent for the prerendered page).",
      files: {
        counters: "Layer 1 is React.cache, layer 2 is a cached function: each counts how often its body really runs.",
        report: "The Server Component that reads all three layers and renders their readings.",
        refresh: "router.refresh(): re-fetches the current route and keeps client state, but not the server caches.",
      },
    },
  },
  pl: {
    openOther: "Otwórz drugą stronę",
    rendering: "Renderowanie na serwerze…",
    otherIntro: "Druga strona. Wróć na dwa sposoby i porównaj znacznik czasu:",
    otherLink: "Link do strony z warstwami (nowa nawigacja)",
    memoization: {
      title: "Memoizacja żądań (React.cache)",
      hint: "Dwa komponenty poprosiły o te same dane w jednym renderze; loader wykonał się raz, więc oba zobaczyły ten sam przebieg. Numer rośnie o jeden na żądanie.",
      componentA: "Komponent A",
      componentB: "Komponent B",
      saw: "zobaczył przebieg",
    },
    serverCache: {
      title: 'Cache serwera ("use cache" + cacheLife("hours"))',
      hint: "Ciało funkcji wykonało się dla przebiegu #N tylko wtedy, gdy w cache nie było nic świeżego. Przeładowanie go nie rusza.",
      run: "przebieg",
      generatedAt: "wygenerowano o",
    },
    routerCache: {
      title: "Router Cache po stronie klienta",
      hint: "Otwórz drugą stronę, a potem wróć na dwa sposoby. Link to nowa nawigacja: strona renderuje się na serwerze od nowa i ten znacznik czasu się zmienia. router.back() lub przycisk wstecz przeglądarki przywraca stronę, którą opuściłeś, z tym samym znacznikiem czasu, bo odwiedzone trasy są zachowywane zamiast renderowane ponownie. Przeładowanie lub router.refresh() go zmienia.",
      renderedAt: "ta strona wyrenderowana o",
    },
    internals: {
      responsesTitle: "Nagłówki odpowiedzi (na żywo)",
      responsesHint:
        "Pierwsza strona jest renderowana per żądanie; druga jest statyczna. Porównaj cache-control i x-nextjs-stale-time (czas życia cache klienta w sekundach, wysyłany dla prerenderowanej strony).",
      files: {
        counters: "Warstwa 1 to React.cache, warstwa 2 to funkcja z cache: każda liczy, ile razy jej ciało naprawdę się wykonuje.",
        report: "Server Component, który czyta wszystkie trzy warstwy i renderuje ich odczyty.",
        refresh: "router.refresh(): pobiera bieżącą trasę ponownie i zachowuje stan klienta, ale nie cache serwera.",
      },
    },
  },
};

export function getCacheLayersText(locale: Locale): CacheLayersText {
  return text[locale];
}

export function getCacheLayersInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: ["/data/cache-layers/demo", "/data/cache-layers/demo/other"],
      headerNames: ["cache-control", "x-nextjs-cache", "x-nextjs-stale-time"],
    },
    files: [
      { path: "src/modules/cache-layers/server/layerCounters.ts", note: internals.files.counters },
      { path: "src/modules/cache-layers/components/LayersReport.tsx", note: internals.files.report },
      { path: "src/modules/cache-layers/components/RefreshButton.tsx", note: internals.files.refresh },
    ],
  };
}
