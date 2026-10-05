import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";
import type { RefusalCode } from "./actionState";

export type HandlingText = {
  handler: {
    title: string;
    prompt: string;
    calling: (mode: string) => string;
    none: string;
    empty: string;
  };
  action: {
    title: string;
    legend: string;
    run: string;
    idle: string;
    reserved: (reservation: string) => string;
    refused: (message: string) => string;
    refusals: Record<RefusalCode, string>;
    hint: string;
  };
  internals: {
    requestsTitle: string;
    requestsHint: string;
    files: { handler: string; reserve: string; action: string };
  };
};

const text: Record<Locale, HandlingText> = {
  en: {
    handler: {
      title: "Route Handler",
      prompt: "Press a button to call the Route Handler.",
      calling: (mode) => `Calling with mode=${mode}…`,
      none: "(none)",
      empty: "(empty)",
    },
    action: {
      title: "Server Action",
      legend: "Outcome to simulate",
      run: "Run the action",
      idle: "No result yet.",
      reserved: (reservation) => `Reserved: ${reservation}`,
      refused: (message) => `Refused: ${message}`,
      refusals: {
        out_of_stock: "That item is out of stock.",
        invalid_mode: "Choose one of the listed modes.",
      },
      hint: '"unexpected" throws: the error boundary of this demo replaces the page with a safe message.',
    },
    internals: {
      requestsTitle: "Handler requests (live)",
      requestsHint:
        "Each mode button is a real GET to /api/error-handling/risky. Compare the console above (status, body) with this list: the uncaught mode answers a bare 500, the unexpected one a 500 with a reference id.",
      files: {
        handler: "The handler: expected failures become a 409, unexpected ones are caught, reported, and answered with a reference id.",
        reserve: "The operation: an expected failure is a value in the return type, an unexpected one is an exception.",
        action: "The action: expected failures are returned as state; an unexpected one is deliberately not caught here.",
      },
    },
  },
  pl: {
    handler: {
      title: "Route Handler",
      prompt: "Naciśnij przycisk, by wywołać Route Handler.",
      calling: (mode) => `Wywołanie z mode=${mode}…`,
      none: "(brak)",
      empty: "(puste)",
    },
    action: {
      title: "Server Action",
      legend: "Wynik do zasymulowania",
      run: "Uruchom akcję",
      idle: "Brak wyniku.",
      reserved: (reservation) => `Zarezerwowano: ${reservation}`,
      refused: (message) => `Odmowa: ${message}`,
      refusals: {
        out_of_stock: "Tego towaru nie ma na stanie.",
        invalid_mode: "Wybierz jeden z wymienionych trybów.",
      },
      hint: '„unexpected” rzuca: error boundary tego dema zastępuje stronę bezpiecznym komunikatem.',
    },
    internals: {
      requestsTitle: "Żądania do handlera (na żywo)",
      requestsHint:
        "Każdy przycisk trybu to prawdziwy GET do /api/error-handling/risky. Porównaj konsolę powyżej (status, body) z tą listą: tryb uncaught odpowiada gołym 500, a unexpected 500 z id referencyjnym.",
      files: {
        handler: "Handler: oczekiwane porażki stają się 409, nieoczekiwane są przechwytywane, raportowane i zwracane z id referencyjnym.",
        reserve: "Operacja: oczekiwana porażka to wartość w typie zwracanym, nieoczekiwana to wyjątek.",
        action: "Akcja: oczekiwane porażki wracają jako stan; nieoczekiwana celowo nie jest tu przechwytywana.",
      },
    },
  },
};

export function getHandlingText(locale: Locale): HandlingText {
  return text[locale];
}

export function getHandlingInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/api/error-handling",
    },
    files: [
      { path: "src/modules/actions-and-handlers/server/handleRiskyRequest.ts", note: internals.files.handler },
      { path: "src/modules/actions-and-handlers/server/reserveItem.ts", note: internals.files.reserve },
      { path: "src/modules/actions-and-handlers/server/actions.ts", note: internals.files.action },
    ],
  };
}
