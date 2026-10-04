import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type DynamicImportText = {
  eager: { title: string; hint: string };
  lazy: { title: string; button: string; hint: string; loading: string };
  heavy: { title: string; result: (count: number, prime: number | undefined) => string };
  internals: {
    treeNotes: Record<string, string>;
    requestsTitle: string;
    requestsHint: string;
    files: { demo: string; heavy: string; eager: string };
  };
};

const text: Record<Locale, DynamicImportText> = {
  en: {
    eager: {
      title: "A dynamic import that is server-rendered",
      hint: "This panel is in the page's HTML from the start; only its JavaScript was split into its own chunk.",
    },
    lazy: {
      title: "A dynamic import with ssr: false",
      button: "Open the heavy panel",
      hint: "Nothing of the panel is in the first load: not its HTML and not its script. Opening it fetches the chunk.",
      loading: "Loading the heavy panel…",
    },
    heavy: {
      title: "The heavy panel",
      result: (count, prime) => `Computed on the client: the ${count}th prime is ${prime}.`,
    },
    internals: {
      treeNotes: {
        "DynamicDemo.tsx": "the dynamic() calls (Client Component)",
        "HeavyPanel.tsx": "ssr: false: its own chunk, fetched on demand",
        "EagerDynamicPanel.tsx": "server-rendered, but still its own chunk",
      },
      requestsTitle: "Script chunks requested (live)",
      requestsHint:
        "Everything the page loaded at start is listed first. The first click on the page makes Next.js load its web-vitals code in the background, so press “Clear the list” once, wait a moment, press it again, and only then press “Open the heavy panel”: exactly one chunk appears. That is the code split at work.",
      files: {
        demo: "The two dynamic() calls. They live in a Client Component because ssr: false is not allowed in a Server Component.",
        heavy: "The code that ends up in its own chunk, fetched only when the panel is first rendered.",
        eager: "Also split into a chunk, but server-rendered, so it is already in the HTML.",
      },
    },
  },
  pl: {
    eager: {
      title: "Dynamiczny import renderowany na serwerze",
      hint: "Ten panel jest w HTML-u strony od początku; tylko jego JavaScript trafił do osobnego chunku.",
    },
    lazy: {
      title: "Dynamiczny import z ssr: false",
      button: "Otwórz ciężki panel",
      hint: "Nic z panelu nie ma w pierwszym załadowaniu: ani jego HTML-a, ani skryptu. Otwarcie pobiera chunk.",
      loading: "Ładowanie ciężkiego panelu…",
    },
    heavy: {
      title: "Ciężki panel",
      result: (count, prime) => `Obliczone po stronie klienta: ${count}. liczba pierwsza to ${prime}.`,
    },
    internals: {
      treeNotes: {
        "DynamicDemo.tsx": "wywołania dynamic() (Client Component)",
        "HeavyPanel.tsx": "ssr: false: osobny chunk, pobierany na żądanie",
        "EagerDynamicPanel.tsx": "renderowany na serwerze, ale nadal osobny chunk",
      },
      requestsTitle: "Żądane chunki skryptów (na żywo)",
      requestsHint:
        "Najpierw widać wszystko, co strona załadowała na starcie. Pierwsze kliknięcie na stronie sprawia, że Next.js ładuje w tle kod web-vitals, więc naciśnij „Wyczyść listę”, poczekaj chwilę, naciśnij ponownie i dopiero potem „Otwórz ciężki panel”: pojawi się dokładnie jeden chunk. To działanie podziału kodu.",
      files: {
        demo: "Dwa wywołania dynamic(). Leżą w Client Componencie, bo ssr: false nie jest dozwolone w Server Componencie.",
        heavy: "Kod, który trafia do osobnego chunku, pobieranego dopiero przy pierwszym renderze panelu.",
        eager: "Też podzielony na chunk, ale renderowany na serwerze, więc już jest w HTML-u.",
      },
    },
  },
};

export function getDynamicImportInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: "src/modules/dynamic-import/components", notes: internals.treeNotes },
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/_next/static/chunks/",
      fileExtension: ".js",
    },
    files: [
      { path: "src/modules/dynamic-import/components/DynamicDemo.tsx", note: internals.files.demo },
      { path: "src/modules/dynamic-import/components/HeavyPanel.tsx", note: internals.files.heavy },
      { path: "src/modules/dynamic-import/components/EagerDynamicPanel.tsx", note: internals.files.eager },
    ],
  };
}

export function useDynamicImportText(): DynamicImportText {
  return text[useLocale()];
}
