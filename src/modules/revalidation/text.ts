import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type RevalidationText = {
  list: { title: string; empty: string; cachedAt: string };
  actions: {
    updateTag: { label: string; hint: string };
    revalidateTag: { label: string; hint: string };
    revalidatePath: { label: string; hint: string };
    refresh: { label: string; hint: string };
    clear: string;
  };
  internals: {
    responsesTitle: string;
    responsesHint: string;
    files: { cached: string; actions: string; store: string };
  };
};

const text: Record<Locale, RevalidationText> = {
  en: {
    list: { title: "Cached list", empty: "(empty)", cachedAt: "cached at" },
    actions: {
      updateTag: { label: "Add + updateTag", hint: "The list shows the new entry right away." },
      revalidateTag: {
        label: "Add + revalidateTag(…, 'max')",
        hint: "Old list right after, and on the next visit while it regenerates; a later visit shows the new entry.",
      },
      revalidatePath: {
        label: "Add + revalidatePath",
        hint: "Invalidates by path instead of by tag; the list updates right away.",
      },
      refresh: {
        label: "Add + refresh()",
        hint: "Refreshes the router only; the cached list is not invalidated.",
      },
      clear: "Clear (updateTag)",
    },
    internals: {
      responsesTitle: "Response headers (live)",
      responsesHint:
        "The page serves the cached list. Press an action, then fetch again: compare how the headers and the list change for each call.",
      files: {
        cached: "The cached view: cacheLife keeps it for hours, cacheTag names it so a tag call can find it.",
        actions: "The four invalidation calls, one per action: updateTag, revalidateTag, revalidatePath, refresh.",
        store: "The in-memory stand-in for a database that the actions change.",
      },
    },
  },
  pl: {
    list: { title: "Lista z cache", empty: "(pusta)", cachedAt: "zcache'owano o" },
    actions: {
      updateTag: { label: "Dodaj + updateTag", hint: "Lista od razu pokazuje nowy wpis." },
      revalidateTag: {
        label: "Dodaj + revalidateTag(…, 'max')",
        hint: "Zaraz po akcji stara lista, także przy następnej wizycie podczas regeneracji; późniejsza wizyta pokazuje nowy wpis.",
      },
      revalidatePath: {
        label: "Dodaj + revalidatePath",
        hint: "Unieważnia po ścieżce zamiast po tagu; lista aktualizuje się od razu.",
      },
      refresh: {
        label: "Dodaj + refresh()",
        hint: "Odświeża tylko router; lista z cache nie jest unieważniana.",
      },
      clear: "Wyczyść (updateTag)",
    },
    internals: {
      responsesTitle: "Nagłówki odpowiedzi (na żywo)",
      responsesHint:
        "Strona serwuje listę z cache. Naciśnij akcję, a potem pobierz ponownie: porównaj, jak zmieniają się nagłówki i lista przy każdym wywołaniu.",
      files: {
        cached: "Widok z cache: cacheLife trzyma go przez godziny, cacheTag nadaje mu nazwę, by wywołanie tagu mogło go znaleźć.",
        actions: "Cztery wywołania unieważniające, po jednym na akcję: updateTag, revalidateTag, revalidatePath, refresh.",
        store: "Zastępnik bazy danych w pamięci, który zmieniają akcje.",
      },
    },
  },
};

export function getRevalidationText(locale: Locale): RevalidationText {
  return text[locale];
}

export function getRevalidationInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: ["/data/revalidation/demo"],
      headerNames: ["cache-control", "x-nextjs-cache", "age"],
    },
    files: [
      { path: "src/modules/revalidation/server/cachedEntries.ts", note: internals.files.cached },
      { path: "src/modules/revalidation/server/actions.ts", note: internals.files.actions },
      { path: "src/modules/revalidation/server/entryStore.ts", note: internals.files.store },
    ],
  };
}
