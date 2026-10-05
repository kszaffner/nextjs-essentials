import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type FormsText = {
  loadingList: string;
  form: { title: string; name: string; add: string; addVip: string; clear: string; hint: string };
  list: { title: string; empty: string };
  internals: {
    requestsTitle: string;
    requestsHint: string;
    files: { form: string; actions: string; list: string };
  };
};

const text: Record<Locale, FormsText> = {
  en: {
    loadingList: "Loading the list…",
    form: {
      title: "Guest list",
      name: "Name",
      add: "Add guest",
      addVip: "Add as VIP",
      clear: "Clear list",
      hint: "Plain HTML attributes (required, maxLength) give instant feedback; the server action parses the input again because the request can come from anywhere.",
    },
    list: { title: "Who is coming", empty: "(nobody yet)" },
    internals: {
      requestsTitle: "Requests to this page (live)",
      requestsHint:
        "Submitting the form sends a POST to this page's own URL, and the response carries the new UI. Add a guest and watch the request appear; Clear first to see only the new ones.",
      files: {
        form: "The form: the action is bound with a role, and a second button brings its own formAction.",
        actions: "The actions: they parse the name and role again, because everything arrives from the client.",
        list: "The list view: rendered per request, from the in-memory guest list.",
      },
    },
  },
  pl: {
    loadingList: "Ładowanie listy…",
    form: {
      title: "Lista gości",
      name: "Imię",
      add: "Dodaj gościa",
      addVip: "Dodaj jako VIP",
      clear: "Wyczyść listę",
      hint: "Zwykłe atrybuty HTML (required, maxLength) dają natychmiastową informację zwrotną; akcja serwera parsuje dane ponownie, bo żądanie może przyjść skądkolwiek.",
    },
    list: { title: "Kto przyjdzie", empty: "(jeszcze nikt)" },
    internals: {
      requestsTitle: "Żądania do tej strony (na żywo)",
      requestsHint:
        "Wysłanie formularza wysyła POST na własny URL tej strony, a odpowiedź niesie nowy UI. Dodaj gościa i zobacz, jak pojawia się żądanie; najpierw naciśnij Wyczyść, by widzieć tylko nowe.",
      files: {
        form: "Formularz: akcja jest związana z rolą, a drugi przycisk przynosi własne formAction.",
        actions: "Akcje: parsują imię i rolę ponownie, bo wszystko przychodzi od klienta.",
        list: "Widok listy: renderowany per żądanie, z listy gości w pamięci.",
      },
    },
  },
};

export function getFormsText(locale: Locale): FormsText {
  return text[locale];
}

export function getFormsInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/server-actions/forms/demo",
    },
    files: [
      { path: "src/modules/forms/components/GuestForm.tsx", note: internals.files.form },
      { path: "src/modules/forms/server/actions.ts", note: internals.files.actions },
      { path: "src/modules/forms/components/GuestListView.tsx", note: internals.files.list },
    ],
  };
}
