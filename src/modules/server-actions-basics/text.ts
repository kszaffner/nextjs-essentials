import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type ServerActionsBasicsText = {
  readingCounter: string;
  serverCounter: string;
  inline: { title: string; button: string; hint: string };
  invoker: {
    title: string;
    button: string;
    hint: string;
    logEntry: (callNumber: number, count: number, elapsedMs: number) => string;
  };
  internals: {
    requestsTitle: string;
    requestsHint: string;
    files: { actions: string; inline: string; invoker: string; store: string };
  };
};

const text: Record<Locale, ServerActionsBasicsText> = {
  en: {
    readingCounter: "Reading the counter…",
    serverCounter: "server counter:",
    inline: {
      title: "1. Inline action in a Server Component",
      button: "Increment (form action)",
      hint: "Works as a plain form post, with or without JavaScript.",
    },
    invoker: {
      title: "2. Imported action, called from a handler",
      button: "Call it three times at once",
      hint: "Fired together, but dispatched one at a time: each call waits for the previous one to finish.",
      logEntry: (callNumber, count, elapsedMs) => `call ${callNumber} returned count ${count} after ${elapsedMs} ms`,
    },
    internals: {
      requestsTitle: "Requests to this page (live)",
      requestsHint:
        "An action call is a POST fetch to this page's own URL. Press a button, and the requests appear here; the three calls start together but finish about 600 ms apart. Press Clear first to see only the new ones.",
      files: {
        actions: "The imported action: a file with \"use server\" at the top, importable by a Client Component.",
        inline: "The inline action: \"use server\" inside the function body of a Server Component.",
        invoker: "A Client Component calling the imported action from an event handler inside a transition.",
        store: "The counter: every update takes 600 ms, so the order and timing of calls can be seen.",
      },
    },
  },
  pl: {
    readingCounter: "Odczyt licznika…",
    serverCounter: "licznik na serwerze:",
    inline: {
      title: "1. Akcja inline w Server Component",
      button: "Zwiększ (akcja formularza)",
      hint: "Działa jako zwykły POST formularza, z JavaScriptem lub bez.",
    },
    invoker: {
      title: "2. Zaimportowana akcja, wywołana z handlera",
      button: "Wywołaj trzy razy naraz",
      hint: "Wystrzelone razem, ale wysyłane po jednym: każde wywołanie czeka, aż poprzednie się skończy.",
      logEntry: (callNumber, count, elapsedMs) => `wywołanie ${callNumber} zwróciło licznik ${count} po ${elapsedMs} ms`,
    },
    internals: {
      requestsTitle: "Żądania do tej strony (na żywo)",
      requestsHint:
        "Wywołanie akcji to POST fetch na własny URL tej strony. Naciśnij przycisk, a żądania pojawią się tutaj; trzy wywołania startują razem, ale kończą się w odstępach około 600 ms. Najpierw naciśnij Wyczyść, by widzieć tylko nowe.",
      files: {
        actions: "Zaimportowana akcja: plik z \"use server\" na górze, który może importować Client Component.",
        inline: "Akcja inline: \"use server\" w ciele funkcji Server Component.",
        invoker: "Client Component wywołujący zaimportowaną akcję z handlera zdarzenia wewnątrz tranzycji.",
        store: "Licznik: każda aktualizacja trwa 600 ms, więc widać kolejność i czas wywołań.",
      },
    },
  },
};

export function getServerActionsBasicsText(locale: Locale): ServerActionsBasicsText {
  return text[locale];
}

export function getServerActionsBasicsInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/server-actions/basics/demo",
    },
    files: [
      { path: "src/modules/server-actions-basics/server/actions.ts", note: internals.files.actions },
      { path: "src/modules/server-actions-basics/components/InlineActionForm.tsx", note: internals.files.inline },
      { path: "src/modules/server-actions-basics/components/ClientInvoker.tsx", note: internals.files.invoker },
      { path: "src/modules/server-actions-basics/server/counterStore.ts", note: internals.files.store },
    ],
  };
}
