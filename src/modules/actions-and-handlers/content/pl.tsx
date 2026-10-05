import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/errors/actions-and-handlers/demo";

export const basics = (
  <>
    <p>
      Nic nie przechwytuje za ciebie nieprzechwyconego throw w Route Handlerze
      ani Server Action tak, jak error boundary łapie błąd renderu. Obsłuż oba
      rodzaje porażek świadomie:
    </p>
    <ul>
      <li>
        <strong>Oczekiwane porażki</strong> (walidacja, reguła biznesowa mówiąca
        „nie”) są częścią kontraktu. Zwracaj je: Route Handler odpowiada 4xx ze
        stabilnym <code>{"{ code, message }"}</code>; Server Action zwraca
        typowany stan, który renderuje <code>useActionState</code>.
      </li>
      <li>
        <strong>Nieoczekiwane porażki</strong> (baza danych leży) to błędy lub
        awarie. Raportuj je, pokaż ogólny komunikat i nigdy nie wkładaj
        przyczyny do odpowiedzi.
      </li>
    </ul>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> wywołuje Route Handler
      w czterech trybach i Server Action w trzech. Zaobserwowane na buildzie
      produkcyjnym:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Tryb</th>
          <th scope="col">Route Handler</th>
          <th scope="col">Server Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ok</td>
          <td>200 z rezerwacją</td>
          <td>stan: reserved</td>
        </tr>
        <tr>
          <td>expected</td>
          <td>409 z kodem out_of_stock</td>
          <td>stan: refused (zwrócony, nie rzucony)</td>
        </tr>
        <tr>
          <td>unexpected</td>
          <td>
            500 z ogólnym komunikatem i id referencyjnym (przechwycony,
            zaraportowany)
          </td>
          <td>rzucony: error boundary pokazuje zamaskowany komunikat i digest</td>
        </tr>
        <tr>
          <td>uncaught</td>
          <td>goły 500 z pustym body (nic go nie przechwyciło)</td>
          <td>(tak samo jak unexpected)</td>
        </tr>
      </tbody>
    </table>
    <CodeBlock title="route.ts" code={`
export async function POST(request: Request) {
  try {
    const input = ReservationSchema.parse(await request.json());
    return Response.json(await reserve(input), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Oczekiwany: stabilny kontrakt 4xx, na którym klient może polegać.
      return Response.json({ code: "invalid", message: "Invalid input" }, { status: 400 });
    }
    reportError(error); // nieoczekiwany: zaraportuj, nigdy nie ujawniaj przyczyny
    return Response.json({ code: "internal", message: "Something went wrong" }, { status: 500 });
  }
}
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Nic nie wycieka, w żadną stronę.</strong> Komunikat porażki to{" "}
      <em>&quot;connect ECONNREFUSED 10.0.0.12:5432&quot;</em>; żadne body
      odpowiedzi go nie zawierało. Wołający dostał id referencyjny, a to samo id
      leży w logu serwera obok pełnego błędu, więc wsparcie znajdzie przyczynę.
    </li>
    <li>
      <strong>Przechwycenie oznacza obowiązek raportowania.</strong> Ścieżka
      „unexpected” w handlerze połyka błąd w odpowiedź 500, więc sama wywołuje
      pomocnik raportujący. Nieprzechwycone błędy są inne:{" "}
      <code>instrumentation.ts</code> eksportuje{" "}
      <code>onRequestError = Sentry.captureRequestError</code>, więc Next.js
      raportuje je centralnie. Nie przechwytuj błędu tylko po to, by go
      zalogować, bo ukryjesz go przed tym hookiem.
    </li>
    <li>
      <strong>Raportuj tylko nieoczekiwane.</strong> 409 lub błąd walidacji to
      normalny ruch. Wysyłanie ich do monitora zakopuje prawdziwe problemy.
      Raportowanie też nigdy nie rzuca: porażka raportowania jest logowana i
      odrzucana, by nie zamaskować oryginalnego błędu.
    </li>
    <li>
      <strong>Rzucony błąd akcji trafia do error boundary.</strong> Akcja, która
      rzuciła, została złapana przez <code>error.tsx</code> segmentu dema, który
      dostał ogólny komunikat i <code>digest</code>. Zwracaj oczekiwane porażki
      zamiast je rzucać, bo użytkownicy stracą formularz na rzecz ekranu
      fallbacku.
    </li>
    <li>
      <strong>Nieprzechwycony throw w handlerze nie ma użytecznego body.</strong>{" "}
      500 miało puste body i brak kodu, więc klient nie wie, co się stało.
      Opakuj pracę i zwróć ustrukturyzowany kształt.
    </li>
    <li>
      <strong>Modeluj oczekiwane błędy w typach.</strong> Typ wyniku to unia
      dyskryminowana (<code>ok: true</code> lub powód), więc wołający nie
      zapomną obsłużyć porażki, a wyczerpujący <code>switch</code> łamie build,
      gdy brakuje przypadku.
    </li>
    <li>
      <strong>
        <code>redirect()</code> i <code>notFound()</code> to wyjątki.
      </strong>{" "}
      Wewnątrz <code>try</code> są łapane jak każdy błąd; wywołaj je poza
      blokiem albo rzuć ponownie przez <code>unstable_rethrow</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym różni się błąd oczekiwany od nieoczekiwanego?",
    answer: (
      <p>
        Oczekiwany jest częścią kontraktu (nieprawidłowe dane, brak towaru):
        zwróć go jako typowaną wartość lub 4xx, by wołający mogli zareagować.
        Nieoczekiwany (zależność leży, błąd w kodzie) rzuca, jest raportowany i
        pojawia się jako ogólna porażka.
      </p>
    ),
  },
  {
    question: "Jak Route Handler ma odpowiedzieć na nieoczekiwany błąd?",
    answer: (
      <p>
        Przez 500 i stabilne body, takie jak{" "}
        <code>{"{ code: \"internal_error\", message, reference }"}</code>: bez
        stack trace, bez wewnętrznego tekstu. Zaloguj pełny błąd z referencją i
        zaraportuj go.
      </p>
    ),
  },
  {
    question: "Dokąd trafiają błędy z Server Actions?",
    answer: (
      <p>
        Oczekiwane zwracasz jako stan. Nieprzechwycony throw propaguje do
        najbliższego error boundary (z zamaskowanym komunikatem i digestem) i jest
        raportowany przez hook błędów żądania. Nic po drodze nie łapie ich
        automatycznie.
      </p>
    ),
  },
  {
    question: "Dlaczego nie zalogować błędu w catch i nie jechać dalej?",
    answer: (
      <p>
        Bo ukrywa to porażkę przed centralnym hookiem raportującym i przed
        wołającymi. Przechwytuj tylko wtedy, gdy możesz się odzyskać,
        przetłumaczyć błąd lub musisz wyprodukować odpowiedź, a gdy go połykasz,
        zaraportuj.
      </p>
    ),
  },
  {
    question: "Co się dzieje przy nieprzechwyconym throw w Route Handlerze?",
    answer: (
      <p>
        Next.js odpowiada gołym 500 (puste body w demo), loguje błąd i raportuje
        go przez <code>onRequestError</code>. Nie dociera do żadnego error
        boundary.
      </p>
    ),
  },
  {
    question: "Czego odpowiedź z błędem nigdy nie powinna zawierać?",
    answer: (
      <p>
        Stack trace&apos;ów, ścieżek plików, surowych komunikatów bazy danych ani
        żadnych wewnętrznych identyfikatorów. Zwróć kod, czytelny komunikat i id
        referencyjne, które pozwala znaleźć szczegóły we własnych logach.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Akcje i handlery",
  summary: "Obsługa błędów w Server Actions i Route Handlerach.",
  basics,
  edgeCases,
  interviewQuestions,
};
