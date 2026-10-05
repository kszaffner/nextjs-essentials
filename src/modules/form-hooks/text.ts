import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";
import type { RejectionReason } from "./postMessageState";

type FormHooksText = {
  loadingBoard: string;
  board: { title: string; sending: string; field: string };
  submit: { idle: string; pending: string };
  status: {
    pending: string;
    idle: string;
    posted: (text: string) => string;
    rejected: (reason: string) => string;
  };
  rejections: Record<RejectionReason, string>;
  internals: {
    requestsTitle: string;
    requestsHint: string;
    files: { board: string; button: string; action: string };
  };
};

const text: Record<Locale, FormHooksText> = {
  en: {
    loadingBoard: "Loading the board…",
    board: { title: "Message board", sending: " (sending…)", field: 'Message (type "fail" to see a rollback)' },
    submit: { idle: "Post message", pending: "Posting…" },
    status: {
      pending: "useActionState: pending",
      idle: "useActionState: idle",
      posted: (text) => `useActionState: posted "${text}"`,
      rejected: (reason) => `useActionState: rejected (${reason})`,
    },
    rejections: {
      invalidLength: "Write between 1 and 60 characters.",
      rejectedByServer: "The server rejected this message.",
    },
    internals: {
      requestsTitle: "Requests to this page (live)",
      requestsHint:
        "The action takes one second. Post a message: the POST appears when it starts, while the list already shows the optimistic entry. Post \"fail\" to see the entry removed when the server rejects it. Press Clear first to see only the new requests.",
      files: {
        board: "useActionState and useOptimistic together: the optimistic list is the real one plus what is being sent.",
        button: "useFormStatus in a child of the form: the only place it can see the form's pending state.",
        action: "The action: previous state first, then FormData; expected failures come back as state, not thrown.",
      },
    },
  },
  pl: {
    loadingBoard: "Ładowanie tablicy…",
    board: { title: "Tablica wiadomości", sending: " (wysyłanie…)", field: 'Wiadomość (wpisz „fail”, by zobaczyć wycofanie)' },
    submit: { idle: "Wyślij wiadomość", pending: "Wysyłanie…" },
    status: {
      pending: "useActionState: pending",
      idle: "useActionState: idle",
      posted: (text) => `useActionState: posted "${text}"`,
      rejected: (reason) => `useActionState: rejected (${reason})`,
    },
    rejections: {
      invalidLength: "Napisz od 1 do 60 znaków.",
      rejectedByServer: "Serwer odrzucił tę wiadomość.",
    },
    internals: {
      requestsTitle: "Żądania do tej strony (na żywo)",
      requestsHint:
        "Akcja trwa sekundę. Wyślij wiadomość: POST pojawia się, gdy startuje, a lista już pokazuje wpis optymistyczny. Wyślij „fail”, by zobaczyć, jak wpis znika po odrzuceniu przez serwer. Najpierw naciśnij Wyczyść, by widzieć tylko nowe żądania.",
      files: {
        board: "useActionState i useOptimistic razem: lista optymistyczna to prawdziwa plus to, co jest wysyłane.",
        button: "useFormStatus w potomku formularza: jedyne miejsce, w którym widzi stan pending formularza.",
        action: "Akcja: najpierw poprzedni stan, potem FormData; oczekiwane błędy wracają jako stan, nie są rzucane.",
      },
    },
  },
};

export function getFormHooksText(locale: Locale): FormHooksText {
  return text[locale];
}

export function getFormHooksInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/server-actions/form-hooks/demo",
    },
    files: [
      { path: "src/modules/form-hooks/components/MessageBoard.tsx", note: internals.files.board },
      { path: "src/modules/form-hooks/components/SubmitButton.tsx", note: internals.files.button },
      { path: "src/modules/form-hooks/server/actions.ts", note: internals.files.action },
    ],
  };
}
