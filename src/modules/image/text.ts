import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type ImageText = {
  hero: { title: string; alt: string; hint: string };
  spacer: string;
  gallery: { title: string; alts: readonly [string, string, string] };
  fill: { title: string; alt: string };
  report: {
    button: string;
    requestCount: (count: number) => string;
    requested: (source: string | null, width: string | null, quality: string | null) => string;
    loaded: string;
    notLoaded: string;
  };
  internals: {
    treeNotes: Record<string, string>;
    requestsTitle: string;
    requestsHint: string;
    files: { demo: string; report: string };
  };
};

const text: Record<Locale, ImageText> = {
  en: {
    hero: {
      title: "1. The hero (the LCP element)",
      alt: "A wavy colour field used as the hero image",
      hint: "width and height reserve the space, so nothing shifts when it loads; sizes tells the browser how wide it will be, so it picks a srcset candidate; preload adds a link in the head.",
    },
    spacer: "Scroll a long way down: the gallery is far below the fold",
    gallery: {
      title: "2. A gallery, lazy by default",
      alts: ["Gallery photo one", "Gallery photo two", "Gallery photo three"],
    },
    fill: { title: "3. fill inside a sized box", alt: "A photo cropped to fill its box" },
    report: {
      button: "What has the browser loaded?",
      requestCount: (count) => `image requests so far: ${count}`,
      requested: (source, width, quality) => `requested: ${source} w=${width} q=${quality}`,
      loaded: "loaded",
      notLoaded: "NOT loaded yet",
    },
    internals: {
      treeNotes: {
        "ImageDemo.tsx": "the three <Image> sections (hero, gallery, fill)",
        "ImageReport.tsx": "reads the browser's resource timeline (Client Component)",
      },
      requestsTitle: "Image requests (live)",
      requestsHint:
        "Every request to the /_next/image endpoint the page makes, with the width and quality Next.js asked for. The hero appears at once; scroll down and the gallery and fill images are added when the browser decides to fetch them.",
      files: {
        demo: "The <Image> props that matter: width and height, sizes, preload on the hero, fill with a sized parent.",
        report: "The button reads performance.getEntriesByType(\"resource\") and each img's loading attribute.",
      },
    },
  },
  pl: {
    hero: {
      title: "1. Hero (element LCP)",
      alt: "Falujące pole kolorów użyte jako obraz hero",
      hint: "width i height rezerwują miejsce, więc nic nie skacze po załadowaniu; sizes mówi przeglądarce, jak szeroki będzie obraz, żeby wybrała kandydata z srcset; preload dodaje link w head.",
    },
    spacer: "Przewiń daleko w dół: galeria jest głęboko pod linią zgięcia",
    gallery: {
      title: "2. Galeria, domyślnie leniwa",
      alts: ["Zdjęcie galerii pierwsze", "Zdjęcie galerii drugie", "Zdjęcie galerii trzecie"],
    },
    fill: { title: "3. fill wewnątrz ramki o rozmiarze", alt: "Zdjęcie przycięte do wypełnienia ramki" },
    report: {
      button: "Co załadowała przeglądarka?",
      requestCount: (count) => `dotychczasowe żądania obrazów: ${count}`,
      requested: (source, width, quality) => `zażądano: ${source} w=${width} q=${quality}`,
      loaded: "załadowany",
      notLoaded: "jeszcze NIE załadowany",
    },
    internals: {
      treeNotes: {
        "ImageDemo.tsx": "trzy sekcje <Image> (hero, galeria, fill)",
        "ImageReport.tsx": "czyta oś czasu zasobów przeglądarki (Client Component)",
      },
      requestsTitle: "Żądania obrazów (na żywo)",
      requestsHint:
        "Każde żądanie strony do endpointu /_next/image, z szerokością i jakością, o które poprosił Next.js. Hero pojawia się od razu; przewiń w dół, a obrazy galerii i fill dojdą, gdy przeglądarka zdecyduje się je pobrać.",
      files: {
        demo: "Istotne właściwości <Image>: width i height, sizes, preload na hero, fill z rodzicem o rozmiarze.",
        report: "Przycisk czyta performance.getEntriesByType(\"resource\") i atrybut loading każdego img.",
      },
    },
  },
};

export function getImageText(locale: Locale): ImageText {
  return text[locale];
}

export function useImageText(): ImageText {
  return text[useLocale()];
}

export function getImageInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: "src/modules/image/components", notes: internals.treeNotes },
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/_next/image",
    },
    files: [
      { path: "src/modules/image/components/ImageDemo.tsx", note: internals.files.demo },
      { path: "src/modules/image/components/ImageReport.tsx", note: internals.files.report },
    ],
  };
}
