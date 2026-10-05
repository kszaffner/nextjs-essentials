import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/server-actions/validation-and-redirect/demo";

export const basics = (
  <>
    <p>
      Akcja jest granicą zaufania, więc najpierw parsuje swoje dane wejściowe.
      Wartości <code>FormData</code> to stringi, więc schemat je też
      konwertuje:
    </p>
    <pre>
      <code>{`const parsed = SignupSchema.safeParse(values);
if (!parsed.success) {
  return { status: "invalid", fieldErrors, values };  // dane, nie throw
}
// ...utwórz konto...
redirect(\`/welcome?name=\${encodeURIComponent(parsed.data.name)}\`);`}</code>
    </pre>
    <ul>
      <li>
        <strong>Waliduj schematem</strong> (Zod) i zwracaj błędy per pole jako
        stan; <code>useActionState</code> je renderuje.
      </li>
      <li>
        <strong>Przekieruj po sukcesie</strong> przez <code>redirect()</code>:
        rzuca specjalny błąd, który Next.js zamienia w nawigację.
      </li>
      <li>
        <strong>Atrybuty HTML</strong> (<code>required</code>,{" "}
        <code>type=&quot;email&quot;</code>) to dodatkowa wygoda, nigdy
        obrona.
      </li>
    </ul>
    <p>
      Wypróbuj <LocalizedLink href={demoHref}>demo</LocalizedLink>; drugi
      przycisk pomija własne kontrole przeglądarki, byś zobaczył kontrole
      serwera. Zaobserwowane: nieprawidłowe wysłanie zwróciło trzy błędy pól;
      poprawne przeszło na stronę powitalną. Bez JavaScriptu poprawny POST
      dostał <code>303 See Other</code> z nagłówkiem <code>Location</code>, a
      nieprawidłowy HTTP 200 z błędami już w HTML.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>redirect()</code> musi zostać poza <code>try/catch</code>.
      </strong>{" "}
      Działa przez rzucenie błędu, więc otaczający <code>catch</code> połyka
      przekierowanie. Wywołaj go po bloku albo rzuć ponownie przez{" "}
      <code>unstable_rethrow(error)</code>, co przepuszcza też{" "}
      <code>notFound()</code>.
    </li>
    <li>
      <strong>Konwersja ukrywa pomyłki.</strong>{" "}
      <code>Number(&quot;&quot;)</code> to <code>0</code>, więc pusty wiek
      przeszedłby regułę z minimum zero. Schemat wymaga niepustego tekstu przed
      konwersją i daje <code>abc</code> własny komunikat zamiast ogólnego.
    </li>
    <li>
      <strong>Uzupełnij to, co wpisał użytkownik.</strong> Pola resetują się po
      akcji, więc demo zwraca <code>values</code> i ustawia{" "}
      <code>defaultValue</code>; pole komentarza celowo tego nie robi i wraca
      puste. Nigdy nie odsyłaj hasła.
    </li>
    <li>
      <strong>Oczekiwane błędy zwracaj, nieoczekiwane rzucaj.</strong> Błędy
      walidacji to stan, który formularz renderuje; niedostępna baza danych
      powinna rzucić, by obsługa błędów i monitoring ją zobaczyły.
    </li>
    <li>
      <strong>Buduj URL-e przekierowań bezpiecznie.</strong> Imię przechodzi
      przez <code>encodeURIComponent</code>. Nigdy nie przekierowuj na URL
      wzięty z żądania bez sprawdzenia go względem listy dozwolonych (open
      redirect).
    </li>
    <li>
      <strong>Wartości z query to też dane wejściowe.</strong> Strona powitalna
      bierze jedną wartość, ogranicza jej długość i pozwala Reactowi ją
      escape&apos;ować: imię <code>Grace &lt;b&gt;Hopper&lt;/b&gt;</code> pokazało
      się jako tekst, bez wstrzykniętego elementu.
    </li>
    <li>
      <strong>Poprzedni stan jest sterowany przez klienta bez JavaScriptu.</strong>{" "}
      Formularz bez JS niesie poprzedni stan w ukrytym polu. Nigdy nie opieraj
      na nim autoryzacji.
    </li>
    <li>
      <strong>Typ i status przekierowania.</strong> W Server Action{" "}
      <code>redirect</code> dodaje wpis do historii (gdzie indziej{" "}
      <code>replace</code>); do trwałej zmiany użyj{" "}
      <code>permanentRedirect</code>. Bez JavaScriptu zaobserwowana odpowiedź
      to <code>303</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak walidować dane formularza w Server Action?",
    answer: (
      <p>
        Odczytaj <code>FormData</code>, sparsuj schematem (<code>safeParse</code>{" "}
        z Zod) i przy błędzie zwróć błędy pól jako stan. Rób to na serwerze,
        nawet gdy formularz ma walidację HTML, bo żądanie może ominąć
        przeglądarkę.
      </p>
    ),
  },
  {
    question: "Dlaczego redirect() nie działa wewnątrz try/catch?",
    answer: (
      <p>
        <code>redirect()</code> rzuca błąd <code>NEXT_REDIRECT</code>, który
        framework przechwytuje, by nawigować. Blok <code>catch</code> by go
        połknął. Wywołaj go poza blokiem albo rzuć ponownie błędy Next.js przez{" "}
        <code>unstable_rethrow</code>.
      </p>
    ),
  },
  {
    question: "Co dzieje się przy przekierowaniu z JavaScriptem i bez?",
    answer: (
      <p>
        Z JavaScriptem to nawigacja po stronie klienta. Bez niego POST dostaje
        przekierowanie HTTP (w demo <code>303 See Other</code> z nagłówkiem{" "}
        <code>Location</code>), a przeglądarka za nim idzie.
      </p>
    ),
  },
  {
    question: "Dlaczego formularz jest pusty po nieudanym wysłaniu i jak to naprawić?",
    answer: (
      <p>
        React resetuje niekontrolowane pola po zakończeniu akcji. Zwróć wysłane
        wartości w stanie i ustaw z nich <code>defaultValue</code> (ale nie dla
        pól wrażliwych).
      </p>
    ),
  },
  {
    question: "Gdzie trafiają błędy oczekiwane i nieoczekiwane?",
    answer: (
      <p>
        Oczekiwane (nieprawidłowe dane, odrzucona reguła biznesowa) są zwracane
        jako typowany stan, który formularz renderuje. Nieoczekiwane rzucają i
        trafiają do error boundary oraz monitoringu.
      </p>
    ),
  },
  {
    question: "Jak zadbać o bezpieczne przekierowania i obsługę query stringa?",
    answer: (
      <p>
        Koduj wartości wstawiane do URL, nigdy nie przekierowuj na dowolny URL
        podany przez użytkownika i traktuj wartości z query jako dane
        wejściowe: ograniczaj je i pozwalaj Reactowi je escape&apos;ować przy
        renderze.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Walidacja i przekierowanie",
  summary: "Walidacja danych, raportowanie błędów i przekierowanie po akcji.",
  basics,
  edgeCases,
  interviewQuestions,
};
