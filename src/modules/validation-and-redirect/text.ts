import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";
import type { SignupErrorCode } from "./signupState";

type SignupText = {
  form: { title: string; submit: string; submitSkippingBrowser: string; hint: string };
  fields: { name: string; email: string; age: string; comment: string };
  errors: Record<SignupErrorCode, string>;
  welcome: { loading: string; defaultName: string; title: string; body: string; back: string };
  internals: {
    requestsTitle: string;
    requestsHint: string;
    files: { action: string; schema: string; fields: string; welcome: string };
  };
};

const text: Record<Locale, SignupText> = {
  en: {
    form: {
      title: "Sign up",
      submit: "Sign up",
      submitSkippingBrowser: "Sign up (skip browser validation)",
      hint: "Browser validation is a convenience. The server validates every field itself and, when all pass, redirects.",
    },
    fields: { name: "Name", email: "Email", age: "Age", comment: "Comment (optional, deliberately not refilled)" },
    errors: {
      nameTooShort: "Name needs at least 2 characters",
      nameTooLong: "Name is at most 30 characters",
      emailInvalid: "Enter a valid email address",
      ageRequired: "Age is required",
      ageNotNumber: "Age must be a number",
      ageNotInteger: "Age must be a whole number",
      ageTooYoung: "You must be at least 13",
      ageTooOld: "Age is at most 120",
      invalidValue: "This value is not valid",
    },
    welcome: {
      loading: "Loading…",
      defaultName: "there",
      title: "Welcome,",
      body: "You arrived here through a redirect() in the Server Action.",
      back: "Back to the form",
    },
    internals: {
      requestsTitle: "Requests (live)",
      requestsHint:
        "Submit the form: the action's POST goes to this page's own URL. With valid input, the redirect then shows up as a request for the welcome page. Press Clear first to see only the new requests.",
      files: {
        action: "The action: parse, return field errors as state, or redirect() outside any try/catch.",
        schema: "The trust boundary: FormData strings are coerced and every rule is enforced on the server.",
        fields: "The fields: refilled from the returned values, each error linked to its input.",
        welcome: "The redirect target: the query value is taken once, bounded, and escaped by React.",
      },
    },
  },
  pl: {
    form: {
      title: "Rejestracja",
      submit: "Zarejestruj",
      submitSkippingBrowser: "Zarejestruj (pomiń walidację przeglądarki)",
      hint: "Walidacja przeglądarki to wygoda. Serwer sam waliduje każde pole i, gdy wszystkie przejdą, przekierowuje.",
    },
    fields: { name: "Imię", email: "E-mail", age: "Wiek", comment: "Komentarz (opcjonalny, celowo nieuzupełniany)" },
    errors: {
      nameTooShort: "Imię musi mieć co najmniej 2 znaki",
      nameTooLong: "Imię ma co najwyżej 30 znaków",
      emailInvalid: "Podaj poprawny adres e-mail",
      ageRequired: "Wiek jest wymagany",
      ageNotNumber: "Wiek musi być liczbą",
      ageNotInteger: "Wiek musi być liczbą całkowitą",
      ageTooYoung: "Musisz mieć co najmniej 13 lat",
      ageTooOld: "Wiek to co najwyżej 120",
      invalidValue: "Ta wartość jest nieprawidłowa",
    },
    welcome: {
      loading: "Ładowanie…",
      defaultName: "gościu",
      title: "Witaj,",
      body: "Trafiłeś tu przez redirect() w Server Action.",
      back: "Wróć do formularza",
    },
    internals: {
      requestsTitle: "Żądania (na żywo)",
      requestsHint:
        "Wyślij formularz: POST akcji idzie na własny URL tej strony. Przy poprawnych danych przekierowanie pojawia się potem jako żądanie strony powitalnej. Najpierw naciśnij Wyczyść, by widzieć tylko nowe żądania.",
      files: {
        action: "Akcja: parsuje, zwraca błędy pól jako stan albo wywołuje redirect() poza try/catch.",
        schema: "Granica zaufania: stringi z FormData są konwertowane, a każda reguła jest egzekwowana na serwerze.",
        fields: "Pola: uzupełniane ze zwróconych wartości, każdy błąd powiązany ze swoim inputem.",
        welcome: "Cel przekierowania: wartość z query jest brana raz, ograniczana i escape'owana przez React.",
      },
    },
  },
};

export function getSignupText(locale: Locale): SignupText {
  return text[locale];
}

export function getSignupInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/server-actions/validation-and-redirect/demo",
    },
    files: [
      { path: "src/modules/validation-and-redirect/server/actions.ts", note: internals.files.action },
      { path: "src/modules/validation-and-redirect/server/signupSchema.ts", note: internals.files.schema },
      { path: "src/modules/validation-and-redirect/components/SignupFields.tsx", note: internals.files.fields },
      { path: "src/modules/validation-and-redirect/components/WelcomeContent.tsx", note: internals.files.welcome },
    ],
  };
}

export function getSignupLoadingText(locale: Locale): string {
  return text[locale].welcome.loading;
}
