import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type NavigationText = {
  playground: {
    title: string;
    pathname: string;
    searchParam: string;
    lastAction: string;
    noAction: string;
    noTab: string;
    links: { tab: string; replaced: string; other: string; noPrefetch: string };
    otherPage: string;
  };
  loadingPlayground: string;
  renderingServer: string;
  serverClock: { title: string; renderedAt: string; hint: string };
  other: { title: string; arrived: string; back: string };
  internals: {
    treeNotes: Record<string, string>;
    requestsTitle: string;
    requestsHint: string;
    files: { playground: string; page: string; other: string };
  };
};

const text: Record<Locale, NavigationText> = {
  en: {
    playground: {
      title: "Client navigation",
      pathname: "usePathname()",
      searchParam: 'useSearchParams().get("tab")',
      lastAction: "Last action (client state)",
      noAction: "none yet",
      noTab: "(none)",
      links: {
        tab: "Link ?tab=link",
        replaced: "Link ?tab=replaced (replace)",
        other: "Link to another page",
        noPrefetch: "Same page, prefetch={false}",
      },
      otherPage: "router.push (other page)",
    },
    loadingPlayground: "Loading the playground…",
    renderingServer: "Rendering on the server…",
    serverClock: {
      title: "Server Component",
      renderedAt: "Rendered on the server at",
      hint: "router.refresh() re-renders this on the server without losing the client state above.",
    },
    other: { title: "Another page", arrived: "You arrived by navigation.", back: "Back to the playground" },
    internals: {
      treeNotes: {
        "page.tsx": "the playground and the server clock, each in its own Suspense",
        "other/page.tsx": "the page the links and router.push go to",
      },
      requestsTitle: "Navigation and prefetch requests (live)",
      requestsHint:
        "On a production build every visible <Link> prefetches its route (an _rsc request). Press router.push or a Link and watch what is fetched. Link with prefetch={false} fetches only on click. Press “Clear the list” first to see only what your next click requests.",
      files: {
        playground: "The Client Component behind the buttons: reads usePathname() and useSearchParams() and calls the router.",
        page: "Wraps the client playground and the server clock in separate Suspense boundaries.",
        other: "The target page of the navigation examples.",
      },
    },
  },
  pl: {
    playground: {
      title: "Nawigacja po stronie klienta",
      pathname: "usePathname()",
      searchParam: 'useSearchParams().get("tab")',
      lastAction: "Ostatnia akcja (stan klienta)",
      noAction: "jeszcze żadna",
      noTab: "(brak)",
      links: {
        tab: "Link ?tab=link",
        replaced: "Link ?tab=replaced (replace)",
        other: "Link do innej strony",
        noPrefetch: "Ta sama strona, prefetch={false}",
      },
      otherPage: "router.push (inna strona)",
    },
    loadingPlayground: "Ładowanie placu zabaw…",
    renderingServer: "Renderowanie na serwerze…",
    serverClock: {
      title: "Server Component",
      renderedAt: "Wyrenderowano na serwerze o",
      hint: "router.refresh() renderuje to ponownie na serwerze bez utraty stanu klienta powyżej.",
    },
    other: { title: "Inna strona", arrived: "Dotarłeś tu przez nawigację.", back: "Wróć do placu zabaw" },
    internals: {
      treeNotes: {
        "page.tsx": "plac zabaw i zegar serwera, każdy we własnym Suspense",
        "other/page.tsx": "strona, do której prowadzą linki i router.push",
      },
      requestsTitle: "Żądania nawigacji i prefetchu (na żywo)",
      requestsHint:
        "Na buildzie produkcyjnym każdy widoczny <Link> prefetchuje swoją trasę (żądanie _rsc). Naciśnij router.push lub Link i obserwuj, co jest pobierane. Link z prefetch={false} pobiera dopiero po kliknięciu. Najpierw naciśnij „Wyczyść listę”, by zobaczyć tylko to, czego zażąda następne kliknięcie.",
      files: {
        playground: "Client Component za przyciskami: czyta usePathname() i useSearchParams() i wywołuje router.",
        page: "Opakowuje kliencki plac zabaw i zegar serwera w osobne granice Suspense.",
        other: "Strona docelowa przykładów nawigacji.",
      },
    },
  },
};

export function getNavigationText(locale: Locale): NavigationText {
  return text[locale];
}

export function useNavigationText(): NavigationText {
  return text[useLocale()];
}

const demoFolder = "src/app/[lang]/fundamentals/navigation/demo";

export function getNavigationInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: demoFolder, notes: internals.treeNotes },
    requests: { title: internals.requestsTitle, description: internals.requestsHint, urlIncludes: "_rsc=" },
    files: [
      { path: "src/modules/navigation/components/NavigationPlayground.tsx", note: internals.files.playground },
      { path: `${demoFolder}/page.tsx`, note: internals.files.page },
      { path: `${demoFolder}/other/page.tsx`, note: internals.files.other },
    ],
  };
}
