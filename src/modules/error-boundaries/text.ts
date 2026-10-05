import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

export type BoundaryKind = "parent" | "page" | "layout" | "handlers";

type ErrorBoundariesText = {
  fallback: {
    boundaries: Record<BoundaryKind, string>;
    caughtBy: (boundary: string) => string;
    message: string;
    digest: string;
    none: string;
    hint: string;
  };
  home: { title: string; hint: string };
  navigation: { label: string; home: string; page: string; layout: string; handler: string };
  eventHandler: {
    title: string;
    initial: string;
    unhandled: string;
    handled: string;
    handledPrefix: string;
    unknown: string;
    hint: string;
  };
  rendering: string;
  internals: {
    responsesTitle: string;
    responsesHint: string;
    files: { page: string; layout: string; fallback: string; crash: string };
  };
};

const text: Record<Locale, ErrorBoundariesText> = {
  en: {
    fallback: {
      boundaries: {
        parent: "demo/error.tsx (the parent boundary)",
        page: "demo/page-crash/error.tsx (the page's own boundary)",
        layout: "demo/layout-crash/error.tsx (the segment's own boundary)",
        handlers: "errors/actions-and-handlers/demo/error.tsx",
      },
      caughtBy: (boundary) => `Caught by ${boundary}`,
      message: "message the browser received:",
      digest: "digest:",
      none: "(none)",
      hint: "The navigation above still works: the layouts around this boundary kept rendering.",
    },
    home: {
      title: "Error boundaries",
      hint: "Pick a scenario above. Each failing route has its own error.tsx, and this segment has one too (demo/error.tsx) as the parent boundary.",
    },
    navigation: {
      label: "Error boundaries demo",
      home: "Demo home",
      page: "A page throws (its own error.tsx catches it)",
      layout: "A layout throws (the segment's own error.tsx cannot catch it)",
      handler: "An event handler throws (no boundary involved)",
    },
    eventHandler: {
      title: "Event handler errors",
      initial: "nothing has happened yet",
      unhandled: "Throw without try/catch",
      handled: "Throw with try/catch",
      handledPrefix: "handled:",
      unknown: "handled: unknown error",
      hint: "The first button reports an error in the console, but no error.tsx appears and the page stays as it is.",
    },
    rendering: "Rendering on the server…",
    internals: {
      responsesTitle: "Status of the crashing pages (live)",
      responsesHint:
        "Both pages throw while rendering, after the shell has streamed, so the status is 200 even though the user sees an error screen. Read the status column: do not use it to detect these errors.",
      files: {
        page: "The page's own error.tsx: a Client Component that renders the shared fallback.",
        layout: "A layout that throws. The error.tsx next to it sits below the layout, so the parent boundary catches it.",
        fallback: "The shared fallback: it shows the masked message and the digest, never the real error text.",
        crash: "The server error, thrown after connection(). Its message mentions internals to show what the browser does not get.",
      },
    },
  },
  pl: {
    fallback: {
      boundaries: {
        parent: "demo/error.tsx (boundary nadrzędny)",
        page: "demo/page-crash/error.tsx (własny boundary strony)",
        layout: "demo/layout-crash/error.tsx (własny boundary segmentu)",
        handlers: "errors/actions-and-handlers/demo/error.tsx",
      },
      caughtBy: (boundary) => `Złapane przez ${boundary}`,
      message: "komunikat, który dostała przeglądarka:",
      digest: "digest:",
      none: "(brak)",
      hint: "Nawigacja powyżej nadal działa: layouty wokół tego boundary dalej się renderowały.",
    },
    home: {
      title: "Error boundaries",
      hint: "Wybierz scenariusz powyżej. Każda wadliwa trasa ma własny error.tsx, a ten segment też ma jeden (demo/error.tsx) jako boundary nadrzędny.",
    },
    navigation: {
      label: "Demo error boundaries",
      home: "Strona główna dema",
      page: "Strona rzuca (łapie ją jej własny error.tsx)",
      layout: "Layout rzuca (własny error.tsx segmentu nie może go złapać)",
      handler: "Handler zdarzenia rzuca (żaden boundary nie bierze udziału)",
    },
    eventHandler: {
      title: "Błędy w handlerach zdarzeń",
      initial: "jeszcze nic się nie stało",
      unhandled: "Rzuć bez try/catch",
      handled: "Rzuć z try/catch",
      handledPrefix: "obsłużono:",
      unknown: "obsłużono: nieznany błąd",
      hint: "Pierwszy przycisk raportuje błąd w konsoli, ale żaden error.tsx się nie pojawia, a strona zostaje taka, jaka jest.",
    },
    rendering: "Renderowanie na serwerze…",
    internals: {
      responsesTitle: "Status wywalających się stron (na żywo)",
      responsesHint:
        "Obie strony rzucają podczas renderu, po przesłaniu powłoki, więc status to 200, choć użytkownik widzi ekran błędu. Przeczytaj kolumnę statusu: nie używaj go do wykrywania takich błędów.",
      files: {
        page: "Własny error.tsx strony: Client Component renderujący wspólny fallback.",
        layout: "Layout, który rzuca. error.tsx obok leży pod layoutem, więc łapie go boundary nadrzędny.",
        fallback: "Wspólny fallback: pokazuje zamaskowany komunikat i digest, nigdy prawdziwy tekst błędu.",
        crash: "Błąd serwera, rzucony po connection(). Jego komunikat wspomina szczegóły wewnętrzne, by pokazać, czego przeglądarka nie dostaje.",
      },
    },
  },
};

export function getErrorBoundariesText(locale: Locale): ErrorBoundariesText {
  return text[locale];
}

// For the Client Components that have no params (error.tsx files).
export function useErrorBoundariesText(): ErrorBoundariesText {
  return text[useLocale()];
}

export function getErrorBoundariesInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: ["/errors/error-boundaries/demo/page-crash", "/errors/error-boundaries/demo/layout-crash"],
      headerNames: ["content-type"],
    },
    files: [
      { path: "src/app/[lang]/errors/error-boundaries/demo/page-crash/error.tsx", note: internals.files.page },
      { path: "src/app/[lang]/errors/error-boundaries/demo/layout-crash/layout.tsx", note: internals.files.layout },
      { path: "src/modules/error-boundaries/components/BoundaryFallback.tsx", note: internals.files.fallback },
      { path: "src/modules/error-boundaries/components/ServerCrash.tsx", note: internals.files.crash },
    ],
  };
}
