import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type InterceptingText = {
  gallery: { title: string; hint: string };
  photoPage: (title: string) => string;
  closeButton: string;
  internals: {
    treeNotes: Record<string, string>;
    requestsTitle: string;
    requestsHint: string;
    files: { layout: string; interceptor: string; page: string; fallback: string };
  };
};

const text: Record<Locale, InterceptingText> = {
  en: {
    gallery: {
      title: "Gallery",
      hint: "Clicking a photo opens it in a modal over this page. Opening the same URL in a new tab, or reloading with the modal open, shows the full photo page instead.",
    },
    photoPage: () =>
      "This is the full photo page (demo/photo/[id]/page.tsx), rendered because the URL was opened directly or the page was reloaded.",
    closeButton: "Close",
    internals: {
      treeNotes: {
        "layout.tsx": "renders {children} and the modal slot",
        "page.tsx": "the gallery",
        "@modal": "parallel route slot: not part of the URL",
        "@modal/default.tsx": "no modal unless a route is intercepted",
        "@modal/(.)photo": "(.) = intercept the photo route on the same level",
        "@modal/(.)photo/[id]/page.tsx": "the modal version (soft navigation)",
        "photo/[id]/page.tsx": "the full page (hard navigation)",
      },
      requestsTitle: "Navigation requests (live)",
      requestsHint:
        "Click a photo: a soft navigation fetches the intercepted route as an _rsc request and the URL changes. Reload on the photo URL: no interception, the full page is served. Press “Clear the list” first to see only what your next click requests.",
      files: {
        layout: "Receives the modal slot as a prop and renders it next to children.",
        interceptor: "Matches photo/[id] from inside the @modal slot, only on soft navigation.",
        page: "The page that is rendered on a direct visit or a reload.",
        fallback: "What the slot shows when nothing is intercepted: null.",
      },
    },
  },
  pl: {
    gallery: {
      title: "Galeria",
      hint: "Kliknięcie zdjęcia otwiera je w modalu nad tą stroną. Otwarcie tego samego URL w nowej karcie albo przeładowanie z otwartym modalem pokazuje zamiast tego pełną stronę zdjęcia.",
    },
    photoPage: () =>
      "To pełna strona zdjęcia (demo/photo/[id]/page.tsx), wyrenderowana, bo URL został otwarty bezpośrednio albo strona została przeładowana.",
    closeButton: "Zamknij",
    internals: {
      treeNotes: {
        "layout.tsx": "renderuje {children} i slot modal",
        "page.tsx": "galeria",
        "@modal": "slot trasy równoległej: nie jest częścią URL",
        "@modal/default.tsx": "brak modala, dopóki żadna trasa nie jest przechwycona",
        "@modal/(.)photo": "(.) = przechwyć trasę photo z tego samego poziomu",
        "@modal/(.)photo/[id]/page.tsx": "wersja modalna (miękka nawigacja)",
        "photo/[id]/page.tsx": "pełna strona (twarda nawigacja)",
      },
      requestsTitle: "Żądania nawigacji (na żywo)",
      requestsHint:
        "Kliknij zdjęcie: miękka nawigacja pobiera przechwyconą trasę jako żądanie _rsc, a URL się zmienia. Przeładuj stronę na URL zdjęcia: bez przechwycenia, serwowana jest pełna strona. Najpierw naciśnij „Wyczyść listę”, by zobaczyć tylko to, czego zażąda następne kliknięcie.",
      files: {
        layout: "Dostaje slot modal jako prop i renderuje go obok children.",
        interceptor: "Dopasowuje photo/[id] ze slotu @modal, tylko przy miękkiej nawigacji.",
        page: "Strona renderowana przy bezpośrednim wejściu lub przeładowaniu.",
        fallback: "Co slot pokazuje, gdy nic nie jest przechwycone: null.",
      },
    },
  },
};

export function getInterceptingText(locale: Locale): InterceptingText {
  return text[locale];
}

export function useInterceptingText(): InterceptingText {
  return text[useLocale()];
}

const demoFolder = "src/app/[lang]/fundamentals/intercepting-routes/demo";

export function getInterceptingInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: demoFolder, notes: internals.treeNotes },
    requests: { title: internals.requestsTitle, description: internals.requestsHint, urlIncludes: "_rsc=" },
    files: [
      { path: `${demoFolder}/layout.tsx`, note: internals.files.layout },
      { path: `${demoFolder}/@modal/(.)photo/[id]/page.tsx`, note: internals.files.interceptor },
      { path: `${demoFolder}/photo/[id]/page.tsx`, note: internals.files.page },
      { path: `${demoFolder}/@modal/default.tsx`, note: internals.files.fallback },
    ],
  };
}
