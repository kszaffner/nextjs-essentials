import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type OgImagesText = {
  navigation: { label: string; suffix: string };
  item: { hint: string };
  inspector: { button: string; notSet: string };
  cardSubtitle: string;
  internals: {
    treeNotes: Record<string, string>;
    files: { image: string; card: string; siteWide: string };
  };
};

const text: Record<Locale, OgImagesText> = {
  en: {
    navigation: { label: "Open Graph demo", suffix: "a page with its own generated image" },
    item: {
      hint: "This segment has its own opengraph-image.tsx, so its og:image points at an image generated for this slug instead of the site-wide one.",
    },
    inspector: { button: "Show this page's image tags", notSet: "(not set)" },
    cardSubtitle: "Generated for this page by opengraph-image.tsx",
    internals: {
      treeNotes: {
        "demo": "the demo segment",
        "demo/page.tsx": "the list of items",
        "demo/[slug]": "one item per slug",
        "demo/[slug]/page.tsx": "the page: no image code in it",
        "demo/[slug]/opengraph-image.tsx": "its own image: replaces the site-wide one for this segment",
      },
      files: {
        image: "The per-slug image: a default export that returns an ImageResponse; alt, size and contentType are exports.",
        card: "The card itself: Satori renders flexbox and a subset of CSS only, hence inline styles and display: flex.",
        siteWide: "The site-wide image at the root of the app, used by every page without its own.",
      },
    },
  },
  pl: {
    navigation: { label: "Demo Open Graph", suffix: "strona z własnym wygenerowanym obrazem" },
    item: {
      hint: "Ten segment ma własny opengraph-image.tsx, więc jego og:image wskazuje na obraz wygenerowany dla tego sluga zamiast ogólnowitrynowego.",
    },
    inspector: { button: "Pokaż tagi obrazu tej strony", notSet: "(nieustawiony)" },
    cardSubtitle: "Wygenerowane dla tej strony przez opengraph-image.tsx",
    internals: {
      treeNotes: {
        "demo": "segment dema",
        "demo/page.tsx": "lista elementów",
        "demo/[slug]": "jeden element na slug",
        "demo/[slug]/page.tsx": "strona: bez kodu obrazu",
        "demo/[slug]/opengraph-image.tsx": "własny obraz: zastępuje ogólnowitrynowy dla tego segmentu",
      },
      files: {
        image: "Obraz per slug: domyślny eksport zwracający ImageResponse; alt, size i contentType to eksporty.",
        card: "Sama karta: Satori renderuje tylko flexbox i podzbiór CSS, stąd style inline i display: flex.",
        siteWide: "Obraz ogólnowitrynowy w korzeniu aplikacji, używany przez każdą stronę bez własnego.",
      },
    },
  },
};

export function getOgImagesText(locale: Locale): OgImagesText {
  return text[locale];
}

export function getOgImagesInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: "src/app/[lang]/metadata/og-images", notes: internals.treeNotes },
    files: [
      { path: "src/app/[lang]/metadata/og-images/demo/[slug]/opengraph-image.tsx", note: internals.files.image },
      { path: "src/modules/og-images/ogImage.tsx", note: internals.files.card },
      { path: "src/app/[lang]/opengraph-image.tsx", note: internals.files.siteWide },
    ],
  };
}
