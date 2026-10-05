import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type MigrationText = {
  loading: string;
  heading: string;
  columns: { call: string; result: string; loadedAt: string };
  executions: string;
  executionsHint: string;
  internals: {
    responsesTitle: string;
    responsesHint: string;
    files: { lookup: string; report: string };
  };
};

const text: Record<Locale, MigrationText> = {
  en: {
    loading: "Looking up users…",
    heading: "with",
    columns: { call: "Call", result: "Result", loadedAt: "Loaded at" },
    executions: "Function bodies executed in this server process:",
    executionsHint: "Three calls, two distinct ids: at most two executions, and reloading does not add any.",
    internals: {
      responsesTitle: "Response headers (live)",
      responsesHint:
        "The page itself is rendered per request (it waits for connection()); the lookups are what the cache holds. Compare Loaded at across reloads: it does not move.",
      files: {
        lookup: "The migrated function: no key-parts array, cacheLife and cacheTag replace the options object.",
        report: "Calls the function with ids 1, 2, 1 in sequence, so the repeated id is a clean cache hit.",
      },
    },
  },
  pl: {
    loading: "Wyszukiwanie użytkowników…",
    heading: "z",
    columns: { call: "Wywołanie", result: "Wynik", loadedAt: "Załadowano o" },
    executions: "Ciała funkcji wykonane w tym procesie serwera:",
    executionsHint: "Trzy wywołania, dwa różne id: co najwyżej dwa wykonania, a przeładowanie żadnego nie dodaje.",
    internals: {
      responsesTitle: "Nagłówki odpowiedzi (na żywo)",
      responsesHint:
        "Sama strona jest renderowana per żądanie (czeka na connection()); to wyszukiwania trzyma cache. Porównaj Załadowano o po przeładowaniach: nie rusza się.",
      files: {
        lookup: "Zmigrowana funkcja: bez tablicy key-parts, cacheLife i cacheTag zastępują obiekt opcji.",
        report: "Wywołuje funkcję z id 1, 2, 1 po kolei, więc powtórzone id to czyste trafienie w cache.",
      },
    },
  },
};

export function getMigrationText(locale: Locale): MigrationText {
  return text[locale];
}

export function getMigrationInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: ["/data/use-cache-migration/demo"],
      headerNames: ["cache-control", "x-nextjs-cache", "age"],
    },
    files: [
      { path: "src/modules/use-cache-migration/server/userLookup.ts", note: internals.files.lookup },
      { path: "src/modules/use-cache-migration/components/LookupReport.tsx", note: internals.files.report },
    ],
  };
}
