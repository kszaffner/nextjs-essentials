import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type TestingComponentsText = {
  greeting: { kind: string; hello: string };
  favourite: { kind: string; add: string; remove: string; goTo: string };
  profile: { kindMissing: string; kindLoaded: string; noProfile: (id: string) => string };
  internals: { files: { greeting: string; client: string; async: string } };
};

const text: Record<Locale, TestingComponentsText> = {
  en: {
    greeting: { kind: "sync component (no hooks, no async)", hello: "Hello," },
    favourite: {
      kind: "client component (state + useRouter)",
      add: "Add to favourites",
      remove: "Remove from favourites",
      goTo: "Go to the topic page",
    },
    profile: {
      kindMissing: "async Server Component",
      kindLoaded: "async Server Component (awaits its data)",
      noProfile: (id) => `No profile with id ${id}.`,
    },
    internals: {
      files: {
        greeting: "The test of the synchronous component: a plain render and an assertion on what the user sees.",
        client: "The test of the Client Component: next/navigation is replaced by a spy, then it clicks and asserts the destination.",
        async: "The test of the async Server Component: it calls the component, awaits it, renders the result; one test shows that rendering it as JSX shows nothing.",
      },
    },
  },
  pl: {
    greeting: { kind: "komponent synchroniczny (bez hooków, bez async)", hello: "Cześć," },
    favourite: {
      kind: "Client Component (stan + useRouter)",
      add: "Dodaj do ulubionych",
      remove: "Usuń z ulubionych",
      goTo: "Przejdź do strony tematu",
    },
    profile: {
      kindMissing: "asynchroniczny Server Component",
      kindLoaded: "asynchroniczny Server Component (czeka na swoje dane)",
      noProfile: (id) => `Brak profilu o id ${id}.`,
    },
    internals: {
      files: {
        greeting: "Test komponentu synchronicznego: zwykły render i asercja na to, co widzi użytkownik.",
        client: "Test Client Component: next/navigation jest zastąpione szpiegiem, potem klika i sprawdza cel nawigacji.",
        async: "Test asynchronicznego Server Component: wywołuje komponent, czeka na niego i renderuje wynik; jeden test pokazuje, że wyrenderowanie go jako JSX nic nie pokazuje.",
      },
    },
  },
};

export function getTestingComponentsText(locale: Locale): TestingComponentsText {
  return text[locale];
}

export function getTestingComponentsInternals(locale: Locale): InternalsSpec {
  const { files } = text[locale].internals;

  return {
    files: [
      { path: "src/modules/testing-components/components/GreetingCard.test.tsx", note: files.greeting },
      { path: "src/modules/testing-components/components/FavouriteButton.test.tsx", note: files.client },
      { path: "src/modules/testing-components/components/AsyncProfileCard.test.tsx", note: files.async },
    ],
  };
}
