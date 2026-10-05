import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type IsrText = {
  title: string;
  generatedAt: string;
  hint: string;
  button: string;
  internals: {
    responsesTitle: string;
    responsesHint: string;
    files: { snapshot: string; action: string; demo: string };
  };
};

const text: Record<Locale, IsrText> = {
  en: {
    title: "Cached catalog snapshot",
    generatedAt: "generated at",
    hint: "Reload more than 10 seconds after that time: you still see this value once while a new one is generated, and the next reload shows it.",
    button: "Revalidate now (on demand)",
    internals: {
      responsesTitle: "Response headers (live)",
      responsesHint:
        "The page is prerendered, so it is served from the cache; cache-control shows how long it may be reused. Fetch again after pressing the button or after 10 seconds to see the page regenerate.",
      files: {
        snapshot: "The cached function: cacheLife sets stale, revalidate and expire; cacheTag lets an action invalidate it.",
        action: "The on-demand path: revalidateTag with the max profile marks the snapshot stale.",
        demo: "A Server Component that awaits the cached snapshot and renders the form.",
      },
    },
  },
  pl: {
    title: "Zcache'owana migawka katalogu",
    generatedAt: "wygenerowano o",
    hint: "Przeładuj ponad 10 sekund po tym czasie: raz nadal zobaczysz tę wartość, gdy generuje się nowa, a następne przeładowanie ją pokaże.",
    button: "Rewaliduj teraz (na żądanie)",
    internals: {
      responsesTitle: "Nagłówki odpowiedzi (na żywo)",
      responsesHint:
        "Strona jest prerenderowana, więc serwowana z cache; cache-control pokazuje, jak długo można jej użyć ponownie. Pobierz ponownie po naciśnięciu przycisku lub po 10 sekundach, by zobaczyć regenerację strony.",
      files: {
        snapshot: "Funkcja z cache: cacheLife ustawia stale, revalidate i expire; cacheTag pozwala akcji ją unieważnić.",
        action: "Ścieżka na żądanie: revalidateTag z profilem max oznacza migawkę jako nieaktualną.",
        demo: "Server Component, który czeka na zcache'owaną migawkę i renderuje formularz.",
      },
    },
  },
};

export function getIsrText(locale: Locale): IsrText {
  return text[locale];
}

export function getIsrInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: ["/rendering/isr/demo"],
      headerNames: ["cache-control", "x-nextjs-cache", "age"],
    },
    files: [
      { path: "src/modules/isr/server/catalogSnapshot.ts", note: internals.files.snapshot },
      { path: "src/modules/isr/server/actions.ts", note: internals.files.action },
      { path: "src/modules/isr/components/IsrDemo.tsx", note: internals.files.demo },
    ],
  };
}
