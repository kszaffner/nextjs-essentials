import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type FontText = {
  title: string;
  samples: { sans: string; mono: string; serif: string };
  sampleLabels: { sans: string; mono: string; serif: string };
  hint: string;
  report: { button: string; faces: (count: number) => string; computed: string };
  internals: {
    treeNotes: Record<string, string>;
    requestsTitle: string;
    requestsHint: string;
    responsesTitle: string;
    responsesHint: string;
    files: { fonts: string; demo: string };
  };
};

const text: Record<Locale, FontText> = {
  en: {
    title: "Three fonts on one page",
    samples: {
      sans: "The site font: Geist, loaded once by the root layout.",
      mono: "Monospace: Geist Mono for code and numbers.",
      serif: "A serif: Lora, loaded only by this page.",
    },
    sampleLabels: {
      sans: "site sans (Geist, from the root layout)",
      mono: "site mono (Geist Mono, from the root layout)",
      serif: "Lora (loaded by this page only)",
    },
    hint: "Lora's files were fetched at build time and are served from this site, with a size-adjusted fallback font so the swap does not move the text.",
    report: {
      button: "Which fonts did the browser load?",
      faces: (count) => `font faces known to the page (${count}):`,
      computed: "computed font-family:",
    },
    internals: {
      treeNotes: {
        "FontDemo.tsx": "applies Lora's variable class to the page's wrapper",
        "FontReport.tsx": "reads document.fonts (Client Component)",
        "Font.module.css": "the font-family values that use the variables",
      },
      requestsTitle: "Font files requested (live)",
      requestsHint:
        "The .woff2 files this page fetched from /_next/static/media: served by this site, never by Google. A font is requested only when a character on the page needs it.",
      responsesTitle: "The Link header of this page",
      responsesHint:
        "Preloading is an HTTP Link header, not a tag in the HTML. The font demo lists one more font than a regular page, because Lora is imported only here.",
      files: {
        fonts: "The loader call: literal options, at the top of a module, with a CSS variable.",
        demo: "Where the variable class is applied, on the smallest wrapper that needs it.",
      },
    },
  },
  pl: {
    title: "Trzy fonty na jednej stronie",
    samples: {
      sans: "Font witryny: Geist, ładowany raz przez główny layout.",
      mono: "Monospace: Geist Mono dla kodu i liczb.",
      serif: "Szeryfowy: Lora, ładowana tylko przez tę stronę.",
    },
    sampleLabels: {
      sans: "sans witryny (Geist, z głównego layoutu)",
      mono: "mono witryny (Geist Mono, z głównego layoutu)",
      serif: "Lora (ładowana tylko przez tę stronę)",
    },
    hint: "Pliki Lory zostały pobrane w czasie builda i są serwowane z tej witryny, z dopasowanym rozmiarem fontem zastępczym, żeby podmiana nie przesuwała tekstu.",
    report: {
      button: "Które fonty załadowała przeglądarka?",
      faces: (count) => `kroje fontów znane stronie (${count}):`,
      computed: "obliczone font-family:",
    },
    internals: {
      treeNotes: {
        "FontDemo.tsx": "nakłada klasę zmiennej Lory na wrapper strony",
        "FontReport.tsx": "czyta document.fonts (Client Component)",
        "Font.module.css": "wartości font-family używające zmiennych",
      },
      requestsTitle: "Żądane pliki fontów (na żywo)",
      requestsHint:
        "Pliki .woff2, które ta strona pobrała z /_next/static/media: serwowane przez tę witrynę, nigdy przez Google. Font jest żądany tylko wtedy, gdy potrzebuje go znak na stronie.",
      responsesTitle: "Nagłówek Link tej strony",
      responsesHint:
        "Preload to nagłówek HTTP Link, a nie tag w HTML. Demo fontów wymienia o jeden font więcej niż zwykła strona, bo Lora jest importowana tylko tu.",
      files: {
        fonts: "Wywołanie loadera: literalne opcje, na górze modułu, ze zmienną CSS.",
        demo: "Miejsce nałożenia klasy zmiennej, na najmniejszym wrapperze, który jej potrzebuje.",
      },
    },
  },
};

export function getFontText(locale: Locale): FontText {
  return text[locale];
}

export function useFontText(): FontText {
  return text[useLocale()];
}

export function getFontInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: "src/modules/font", notes: internals.treeNotes },
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/_next/static/media/",
    },
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: ["/optimization/font/demo", "/optimization/image/demo"],
      headerNames: ["link"],
    },
    files: [
      { path: "src/modules/font/fonts.ts", note: internals.files.fonts },
      { path: "src/modules/font/components/FontDemo.tsx", note: internals.files.demo },
    ],
  };
}
