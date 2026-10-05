import { useLocale, type Locale } from "@/shared/i18n";

type CompositionText = {
  collapsibleTitle: string;
  hide: string;
  show: string;
  serverContent: string;
  rendering: string;
  facts: { nodeVersion: string; renderedAt: string; marker: string };
  hint: string;
  internals: {
    searchTitle: string;
    searchHint: string;
    files: { demo: string; collapsible: string; serverFacts: string };
  };
};

const text: Record<Locale, CompositionText> = {
  en: {
    collapsibleTitle: "A Client Component wrapping a Server Component",
    hide: "Hide",
    show: "Show",
    serverContent: "server content",
    rendering: "Rendering on the server…",
    facts: {
      nodeVersion: "process.version",
      renderedAt: "rendered on the server at",
      marker: "server-only module marker",
    },
    hint: "Toggle the panel: the timestamp stays the same, because this was rendered once on the server and only shown or hidden on the client.",
    internals: {
      searchTitle: "Is the server-only code in the browser? (live)",
      searchHint:
        "The marker below is a constant in a module that imports server-only. It is printed in the panel above, so it is in the HTML, yet the search finds it in none of the JavaScript chunks the browser downloaded.",
      files: {
        demo: "The Server Component that composes: it nests the server panel inside the client wrapper.",
        collapsible: "The Client Component with state. It renders {children} and never imports server code.",
        serverFacts: "A module that starts with import \"server-only\": a build error if a client file imports it.",
      },
    },
  },
  pl: {
    collapsibleTitle: "Client Component opakowujący Server Component",
    hide: "Ukryj",
    show: "Pokaż",
    serverContent: "treść z serwera",
    rendering: "Renderowanie na serwerze…",
    facts: {
      nodeVersion: "process.version",
      renderedAt: "wyrenderowano na serwerze o",
      marker: "znacznik modułu server-only",
    },
    hint: "Przełącz panel: znacznik czasu zostaje ten sam, bo to wyrenderowano raz na serwerze, a po stronie klienta tylko pokazano lub ukryto.",
    internals: {
      searchTitle: "Czy kod server-only jest w przeglądarce? (na żywo)",
      searchHint:
        "Poniższy znacznik to stała w module importującym server-only. Jest wypisany w panelu powyżej, więc jest w HTML-u, a mimo to wyszukiwanie nie znajduje go w żadnym chunku JavaScript pobranym przez przeglądarkę.",
      files: {
        demo: "Server Component, który komponuje: zagnieżdża panel serwerowy w kliencki wrapper.",
        collapsible: "Client Component ze stanem. Renderuje {children} i nigdy nie importuje kodu serwerowego.",
        serverFacts: "Moduł zaczynający się od import \"server-only\": błąd builda, jeśli zaimportuje go plik kliencki.",
      },
    },
  },
};

export function getCompositionText(locale: Locale): CompositionText {
  return text[locale];
}

export function useCompositionText(): CompositionText {
  return text[useLocale()];
}
