import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type GenerateMetadataText = {
  navigation: { label: string; alpha: string; preserved: string; beta: string };
  home: string;
  article: { lossy: string; preserved: string };
  head: { button: string };
  internals: {
    files: { layout: string; lossy: string; preserved: string; builders: string };
  };
};

const text: Record<Locale, GenerateMetadataText> = {
  en: {
    navigation: {
      label: "generateMetadata demo",
      alpha: "alpha: generateMetadata replaces openGraph",
      preserved: "preserved/alpha: builds on the parent's openGraph",
      beta: "beta: same route, different data",
    },
    home: "Pick an article above.",
    article: {
      lossy: "This route's generateMetadata returns its own openGraph object, which replaces the layout's.",
      preserved: "This route builds on the parent's openGraph through the parent argument.",
    },
    head: { button: "Show this page's head tags" },
    internals: {
      files: {
        layout: "Static metadata for every route below: a title template and Open Graph defaults.",
        lossy: "Returns its own openGraph: metadata merges shallowly, so the layout's siteName and type are lost.",
        preserved: "Reads the parent's resolved metadata and spreads it, so nothing is lost.",
        builders: "Both builders and the shared loader: notFound() runs here, so metadata and page agree.",
      },
    },
  },
  pl: {
    navigation: {
      label: "Demo generateMetadata",
      alpha: "alpha: generateMetadata zastępuje openGraph",
      preserved: "preserved/alpha: rozbudowuje openGraph rodzica",
      beta: "beta: ta sama trasa, inne dane",
    },
    home: "Wybierz artykuł powyżej.",
    article: {
      lossy: "generateMetadata tej trasy zwraca własny obiekt openGraph, który zastępuje ten z layoutu.",
      preserved: "Ta trasa rozbudowuje openGraph rodzica przez argument parent.",
    },
    head: { button: "Pokaż tagi head tej strony" },
    internals: {
      files: {
        layout: "Statyczne metadane dla każdej trasy niżej: szablon tytułu i domyślne wartości Open Graph.",
        lossy: "Zwraca własny openGraph: metadane scalają się płytko, więc siteName i type z layoutu przepadają.",
        preserved: "Czyta rozwiązane metadane rodzica i je rozsmarowuje, więc nic nie ginie.",
        builders: "Oba buildery i wspólny loader: tu wykonuje się notFound(), więc metadane i strona się zgadzają.",
      },
    },
  },
};

export function getGenerateMetadataText(locale: Locale): GenerateMetadataText {
  return text[locale];
}

export function getGenerateMetadataInternals(locale: Locale): InternalsSpec {
  const { files } = text[locale].internals;

  return {
    files: [
      { path: "src/app/[lang]/metadata/generate-metadata/demo/layout.tsx", note: files.layout },
      { path: "src/app/[lang]/metadata/generate-metadata/demo/[slug]/page.tsx", note: files.lossy },
      { path: "src/app/[lang]/metadata/generate-metadata/demo/preserved/[slug]/page.tsx", note: files.preserved },
      { path: "src/modules/generate-metadata/server/articleMetadata.ts", note: files.builders },
    ],
  };
}
