import { useLocale, type Locale } from "@/shared/i18n";

type PitfallsText = {
  leaf: { title: string; body: string };
  allClient: { title: string; body: string };
  like: string;
  internals: { leafTitle: string; leafHint: string; allTitle: string; allHint: string; files: { leaf: string; all: string; button: string } };
};

const text: Record<Locale, PitfallsText> = {
  en: {
    leaf: { title: "Good: a client leaf", body: "is rendered on the server." },
    allClient: { title: "Pitfall: everything is client", body: "ships in the client bundle." },
    like: "Like",
    internals: {
      leafTitle: "Is the leaf card's text in the browser? (live)",
      leafHint: "This text is in the HTML of the good card, but only the small button is client code, so the text should be in no chunk.",
      allTitle: "Is the all-client card's text in the browser? (live)",
      allHint: "The directive sits on the whole card, so its static text is bundled as JavaScript. The search should find it.",
      files: {
        leaf: "A Server Component: its text never ships as JavaScript, only the LikeButton does.",
        all: "\"use client\" on the whole card: the static text goes into the client bundle too.",
        button: "The only interactive part, so the only part that needs the directive.",
      },
    },
  },
  pl: {
    leaf: { title: "Dobrze: kliencki liść", body: "jest renderowane na serwerze." },
    allClient: { title: "Pułapka: wszystko kliencko", body: "trafia do bundla klienta." },
    like: "Lubię",
    internals: {
      leafTitle: "Czy tekst karty z liściem jest w przeglądarce? (na żywo)",
      leafHint: "Ten tekst jest w HTML-u dobrej karty, ale tylko mały przycisk jest kodem klienckim, więc tekstu nie powinno być w żadnym chunku.",
      allTitle: "Czy tekst karty „wszystko kliencko” jest w przeglądarce? (na żywo)",
      allHint: "Dyrektywa jest na całej karcie, więc jej statyczny tekst jest bundlowany jako JavaScript. Wyszukiwanie powinno go znaleźć.",
      files: {
        leaf: "Server Component: jego tekst nigdy nie trafia jako JavaScript, tylko LikeButton.",
        all: "\"use client\" na całej karcie: statyczny tekst trafia też do bundla klienta.",
        button: "Jedyna część interaktywna, więc jedyna, która potrzebuje dyrektywy.",
      },
    },
  },
};

export function getPitfallsText(locale: Locale): PitfallsText {
  return text[locale];
}

export function usePitfallsText(): PitfallsText {
  return text[useLocale()];
}
