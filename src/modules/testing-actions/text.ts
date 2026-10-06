import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";
import type { TestedUnitId } from "./testedUnits";

type TestingActionsText = {
  table: { what: string; technique: string; file: string; footerBefore: string; footerAfter: string };
  units: Record<TestedUnitId, { title: string; technique: string }>;
  internals: { files: { redirect: string; refresh: string; delay: string; fetch: string } };
};

const text: Record<Locale, TestingActionsText> = {
  en: {
    table: {
      what: "What is tested",
      technique: "Technique",
      file: "Test file",
      footerBefore: "Every row is a real test in this repository; run them with",
      footerAfter: ".",
    },
    units: {
      actionRedirect: {
        title: "Server Action with validation and redirect",
        technique: "Call the action with a FormData. The real redirect() throws; assert on its digest.",
      },
      actionRefresh: {
        title: "Server Action that refreshes the page",
        technique: "Mock next/cache so refresh() is a spy; assert the action asked for it.",
      },
      actionDelay: {
        title: "Server Action with a built-in delay",
        technique: "Fake timers advance the wait; the test never sleeps.",
      },
      actionFailures: {
        title: "Server Action with expected and unexpected failures",
        technique: "Assert that expected failures are returned and unexpected ones are thrown.",
      },
      routeHandler: {
        title: "Route Handler logic",
        technique: "Real NextRequest in, real Response out; only connection() is mocked.",
      },
      useCache: {
        title: 'A function marked "use cache"',
        technique: "Mock cacheLife and cacheTag; the body runs as plain code and the calls are asserted.",
      },
      fetchClient: {
        title: "Code that calls fetch",
        technique: "Stub the global fetch; assert the URL, the options, and how bad responses are handled.",
      },
      proxyDecisions: {
        title: "Proxy decisions",
        technique: "Keep the logic a pure function so it needs no request at all.",
      },
      schema: {
        title: "A validation schema",
        technique: 'Stub "server-only" and test the schema like any other function.',
      },
      errorReporter: {
        title: "The error reporter",
        technique: "Mock the monitoring SDK, including making it throw, to prove reporting never does.",
      },
    },
    internals: {
      files: {
        redirect: "A real test: the action is called with a FormData, and the redirect is asserted through its digest.",
        refresh: "A real test: next/cache is mocked so refresh() is a spy.",
        delay: "A real test: fake timers skip the one-second wait.",
        fetch: "A real test: the global fetch is stubbed and the URL and options are asserted.",
      },
    },
  },
  pl: {
    table: {
      what: "Co jest testowane",
      technique: "Technika",
      file: "Plik testu",
      footerBefore: "Każdy wiersz to prawdziwy test w tym repozytorium; uruchom je przez",
      footerAfter: ".",
    },
    units: {
      actionRedirect: {
        title: "Server Action z walidacją i przekierowaniem",
        technique: "Wywołaj akcję z FormData. Prawdziwy redirect() rzuca; sprawdź jego digest.",
      },
      actionRefresh: {
        title: "Server Action odświeżająca stronę",
        technique: "Zamockuj next/cache, by refresh() był szpiegiem; sprawdź, że akcja o niego poprosiła.",
      },
      actionDelay: {
        title: "Server Action z wbudowanym opóźnieniem",
        technique: "Fałszywe timery przesuwają czekanie; test nigdy nie śpi.",
      },
      actionFailures: {
        title: "Server Action z oczekiwanymi i nieoczekiwanymi porażkami",
        technique: "Sprawdź, że oczekiwane porażki są zwracane, a nieoczekiwane rzucane.",
      },
      routeHandler: {
        title: "Logika Route Handlera",
        technique: "Prawdziwy NextRequest na wejściu, prawdziwy Response na wyjściu; mockowane jest tylko connection().",
      },
      useCache: {
        title: 'Funkcja oznaczona "use cache"',
        technique: "Zamockuj cacheLife i cacheTag; ciało działa jak zwykły kod, a wywołania są sprawdzane.",
      },
      fetchClient: {
        title: "Kod wołający fetch",
        technique: "Zastąp globalny fetch; sprawdź URL, opcje i obsługę złych odpowiedzi.",
      },
      proxyDecisions: {
        title: "Decyzje proxy",
        technique: "Trzymaj logikę jako czystą funkcję, by nie potrzebowała żadnego żądania.",
      },
      schema: {
        title: "Schemat walidacji",
        technique: 'Zastąp "server-only" stubem i testuj schemat jak każdą inną funkcję.',
      },
      errorReporter: {
        title: "Reporter błędów",
        technique: "Zamockuj SDK monitoringu, także każąc mu rzucić, by udowodnić, że raportowanie nigdy nie rzuca.",
      },
    },
    internals: {
      files: {
        redirect: "Prawdziwy test: akcję wywołuje się z FormData, a przekierowanie sprawdza przez jego digest.",
        refresh: "Prawdziwy test: next/cache jest zamockowany, więc refresh() to szpieg.",
        delay: "Prawdziwy test: fałszywe timery pomijają sekundowe czekanie.",
        fetch: "Prawdziwy test: globalny fetch jest zastąpiony, a URL i opcje sprawdzane.",
      },
    },
  },
};

export function getTestingActionsText(locale: Locale): TestingActionsText {
  return text[locale];
}

export function getTestingActionsInternals(locale: Locale): InternalsSpec {
  const { files } = text[locale].internals;

  return {
    files: [
      { path: "src/modules/validation-and-redirect/server/actions.test.ts", note: files.redirect },
      { path: "src/modules/forms/server/actions.test.ts", note: files.refresh },
      { path: "src/modules/form-hooks/server/actions.test.ts", note: files.delay },
      { path: "src/modules/fetch-extensions/server/clockClient.test.ts", note: files.fetch },
    ],
  };
}
