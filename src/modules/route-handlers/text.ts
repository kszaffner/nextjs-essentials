import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

export type RouteHandlersText = {
  title: string;
  prompt: string;
  sending: (label: string) => string;
  none: string;
  empty: string;
  internals: {
    requestsTitle: string;
    requestsHint: string;
    files: { route: string; handlers: string; errors: string };
  };
};

const text: Record<Locale, RouteHandlersText> = {
  en: {
    title: "Notes API console",
    prompt: "Press a button to call the API.",
    sending: (label) => `Sending ${label}…`,
    none: "(none)",
    empty: "(empty)",
    internals: {
      requestsTitle: "API requests (live)",
      requestsHint:
        "Every button is a real fetch to /api/route-handlers. Press Clear, call a few endpoints, and compare the list with the console above: the method and status are in the console, the timing and size here.",
      files: {
        route: "The route file: one exported function per HTTP method, nothing else.",
        handlers: "The handlers: validate the query and the body with schemas, return the right status per failure.",
        errors: "The one error shape every failure uses: a code, a message, optional details, never a stack trace.",
      },
    },
  },
  pl: {
    title: "Konsola API notatek",
    prompt: "Naciśnij przycisk, by wywołać API.",
    sending: (label) => `Wysyłanie ${label}…`,
    none: "(brak)",
    empty: "(puste)",
    internals: {
      requestsTitle: "Żądania do API (na żywo)",
      requestsHint:
        "Każdy przycisk to prawdziwy fetch do /api/route-handlers. Naciśnij Wyczyść, wywołaj kilka endpointów i porównaj listę z konsolą powyżej: metoda i status są w konsoli, czas i rozmiar tutaj.",
      files: {
        route: "Plik trasy: jedna wyeksportowana funkcja na metodę HTTP i nic więcej.",
        handlers: "Handlery: walidują query i body schematami, zwracają właściwy status dla każdego błędu.",
        errors: "Jeden kształt błędu dla każdej porażki: kod, komunikat, opcjonalne szczegóły, nigdy stack trace.",
      },
    },
  },
};

export function getRouteHandlersText(locale: Locale): RouteHandlersText {
  return text[locale];
}

export function getRouteHandlersInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/api/route-handlers",
    },
    files: [
      { path: "src/app/api/route-handlers/notes/route.ts", note: internals.files.route },
      { path: "src/modules/route-handlers/server/notesApi.ts", note: internals.files.handlers },
      { path: "src/modules/route-handlers/server/apiErrors.ts", note: internals.files.errors },
    ],
  };
}
