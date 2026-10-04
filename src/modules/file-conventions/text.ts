import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type FileConventionsText = {
  layoutProbe: string;
  templateProbe: string;
  probePlaceholder: string;
  navigationLabel: string;
  links: {
    home: string;
    second: string;
    slow: string;
    crash: string;
    missing: string;
    about: string;
    privateFolder: string;
  };
  pages: {
    home: { title: string; description: string };
    second: { title: string; description: string };
    about: { title: string; description: string };
    privateFolder: { title: string; description: string };
  };
  slow: { title: string; body: (milliseconds: number) => string };
  loading: { title: string; body: string };
  notFound: { title: string; body: string };
  error: { title: string; retry: string; hint: string };
  crash: { title: string; body: string; button: string; message: string };
  internals: {
    treeNotes: Record<string, string>;
    files: { layout: string; template: string; loading: string; error: string; notFound: string };
    requestsTitle: string;
    requestsHint: string;
  };
};

const text: Record<Locale, FileConventionsText> = {
  en: {
    layoutProbe: "layout.tsx input (persists across navigation)",
    templateProbe: "template.tsx input (resets on navigation)",
    probePlaceholder: "Type here, then use the links below",
    navigationLabel: "File conventions demo",
    links: {
      home: "Demo home",
      second: "Second page",
      slow: "Slow page (loading.tsx)",
      crash: "Crash page (error.tsx)",
      missing: "Missing page (not-found.tsx)",
      about: "About (route group)",
      privateFolder: "_private folder (404)",
    },
    pages: {
      home: {
        title: "Demo home",
        description: "This is demo/page.tsx. Type in both inputs, then open another demo page.",
      },
      second: {
        title: "Second page",
        description: "This is demo/second/page.tsx. Check which input kept its text.",
      },
      about: {
        title: "About (route group)",
        description: "This file is demo/(grouped)/about/page.tsx, but the URL has no (grouped) segment.",
      },
      privateFolder: { title: "Private", description: "You should not be able to see this." },
    },
    slow: {
      title: "Slow page",
      body: (milliseconds) => `This content took ${milliseconds} ms to render on the server.`,
    },
    loading: { title: "Loading…", body: "This is loading.tsx, shown while the page streams in." },
    notFound: {
      title: "This is not-found.tsx",
      body: "The page called notFound(), so the closest not-found.tsx rendered.",
    },
    error: {
      title: "This is error.tsx",
      retry: "Try again",
      hint: "The links above still work: the layout and template sit outside this error boundary.",
    },
    crash: {
      title: "Crash page",
      body: "Rendering this component throws once you press the button.",
      button: "Throw a rendering error",
      message: "Deliberate rendering error from the crash demo.",
    },
    internals: {
      treeNotes: {
        "layout.tsx": "layout: stays mounted",
        "template.tsx": "template: remounts on every navigation",
        "page.tsx": "the demo home page",
        "second": "a plain segment",
        "slow/loading.tsx": "loading: the Suspense fallback",
        "crash/error.tsx": "error: the error boundary",
        "missing/not-found.tsx": "not-found: answers notFound()",
        "(grouped)": "route group: not part of the URL",
        "_private": "private folder: never a route",
      },
      files: {
        layout: "Wraps every page of the demo and is not remounted when you navigate, so its input keeps what you typed.",
        template: "Same position as the layout, but React gives it a new key on each navigation, so its input is recreated empty.",
        loading: "Next.js wraps the sibling page.tsx in <Suspense fallback={this component}>.",
        error: "An error boundary for this segment. It must be a Client Component.",
        notFound: "Rendered when the sibling page.tsx calls notFound().",
      },
      requestsTitle: "Navigation requests (live)",
      requestsHint: "Each client-side navigation asks the server for the next segment as a React Server Component payload (_rsc). Press “Clear the list” first to see only what your next click requests.",
    },
  },
  pl: {
    layoutProbe: "pole z layout.tsx (zostaje po nawigacji)",
    templateProbe: "pole z template.tsx (zeruje się po nawigacji)",
    probePlaceholder: "Wpisz tutaj, potem użyj linków poniżej",
    navigationLabel: "Demo konwencji plików",
    links: {
      home: "Strona główna dema",
      second: "Druga strona",
      slow: "Wolna strona (loading.tsx)",
      crash: "Strona z awarią (error.tsx)",
      missing: "Brakująca strona (not-found.tsx)",
      about: "O nas (grupa tras)",
      privateFolder: "folder _private (404)",
    },
    pages: {
      home: {
        title: "Strona główna dema",
        description: "To demo/page.tsx. Wpisz tekst w oba pola, potem otwórz inną stronę dema.",
      },
      second: {
        title: "Druga strona",
        description: "To demo/second/page.tsx. Sprawdź, które pole zachowało tekst.",
      },
      about: {
        title: "O nas (grupa tras)",
        description: "Ten plik to demo/(grouped)/about/page.tsx, ale w URL nie ma segmentu (grouped).",
      },
      privateFolder: { title: "Prywatne", description: "Nie powinieneś tego widzieć." },
    },
    slow: {
      title: "Wolna strona",
      body: (milliseconds) => `Wyrenderowanie tej treści na serwerze zajęło ${milliseconds} ms.`,
    },
    loading: { title: "Ładowanie…", body: "To loading.tsx, widoczny, gdy strona jest streamowana." },
    notFound: {
      title: "To jest not-found.tsx",
      body: "Strona wywołała notFound(), więc wyrenderował się najbliższy not-found.tsx.",
    },
    error: {
      title: "To jest error.tsx",
      retry: "Spróbuj ponownie",
      hint: "Linki powyżej nadal działają: layout i template są poza tą granicą błędów.",
    },
    crash: {
      title: "Strona z awarią",
      body: "Renderowanie tego komponentu rzuca błąd po naciśnięciu przycisku.",
      button: "Rzuć błąd renderowania",
      message: "Celowy błąd renderowania z dema awarii.",
    },
    internals: {
      treeNotes: {
        "layout.tsx": "layout: zostaje zamontowany",
        "template.tsx": "template: montuje się od nowa przy każdej nawigacji",
        "page.tsx": "strona główna dema",
        "second": "zwykły segment",
        "slow/loading.tsx": "loading: fallback Suspense",
        "crash/error.tsx": "error: granica błędów",
        "missing/not-found.tsx": "not-found: odpowiada na notFound()",
        "(grouped)": "grupa tras: nie jest częścią URL",
        "_private": "folder prywatny: nigdy nie jest trasą",
      },
      files: {
        layout: "Opakowuje każdą stronę dema i nie montuje się od nowa przy nawigacji, więc jego pole zachowuje wpisany tekst.",
        template: "To samo miejsce co layout, ale React nadaje mu nowy klucz przy każdej nawigacji, więc jego pole powstaje puste.",
        loading: "Next.js opakowuje sąsiedni page.tsx w <Suspense fallback={ten komponent}>.",
        error: "Granica błędów tego segmentu. Musi być Client Componentem.",
        notFound: "Renderuje się, gdy sąsiedni page.tsx wywoła notFound().",
      },
      requestsTitle: "Żądania nawigacji (na żywo)",
      requestsHint: "Każda nawigacja po stronie klienta prosi serwer o następny segment jako ładunek React Server Component (_rsc). Najpierw naciśnij „Wyczyść listę”, by zobaczyć tylko to, czego zażąda następne kliknięcie.",
    },
  },
};

export function getFileConventionsText(locale: Locale): FileConventionsText {
  return text[locale];
}

// For Client Components, which read the language from the layout's context.
export function useFileConventionsText(): FileConventionsText {
  return text[useLocale()];
}

const demoFolder = "src/app/[lang]/fundamentals/file-conventions/demo";

// What the "Under the hood" panel of the demo shows, as data.
export function getFileConventionsInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: demoFolder, notes: internals.treeNotes },
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "_rsc=",
    },
    files: [
      { path: `${demoFolder}/layout.tsx`, note: internals.files.layout },
      { path: `${demoFolder}/template.tsx`, note: internals.files.template },
      { path: `${demoFolder}/slow/loading.tsx`, note: internals.files.loading },
      { path: `${demoFolder}/crash/error.tsx`, note: internals.files.error },
      { path: `${demoFolder}/missing/not-found.tsx`, note: internals.files.notFound },
    ],
  };
}
