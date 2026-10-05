import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/server-actions/form-hooks/demo";

export const basics = (
  <>
    <p>
      Trzy hooki Reacta łączą formularze z Server Actions:
    </p>
    <ul>
      <li>
        <code>useActionState(action, initialState)</code> zwraca{" "}
        <code>[state, formAction, isPending]</code>. Akcja dostaje{" "}
        <strong>najpierw poprzedni stan</strong>, potem <code>FormData</code>;
        to, co zwróci, staje się nowym stanem.
      </li>
      <li>
        <code>useFormStatus()</code> (z <code>react-dom</code>) zwraca{" "}
        <code>{"{ pending }"}</code> najbliższego formularza nadrzędnego:
        idealny do wielokrotnego użytku przycisku wysyłania.
      </li>
      <li>
        <code>useOptimistic(value, reducer)</code> zwraca{" "}
        <code>[optimisticValue, addOptimistic]</code>: pokaż oczekiwany wynik
        natychmiast i pozwól mu ustalić się na prawdziwym, gdy akcja się
        skończy.
      </li>
    </ul>
    <p>
      W <LocalizedLink href={demoHref}>demo</LocalizedLink> akcja trwa
      sekundę. Zmierzone: 250 ms po wysłaniu nowa wiadomość była już na liście
      jako „wysyłanie…”, przycisk pokazywał „Wysyłanie…” i był wyłączony, a{" "}
      <code>useActionState</code> raportował pending. Gdy akcja się skończyła,
      wpis stał się prawdziwy. Wysłanie wiadomości <code>fail</code> pokazało
      wpis optymistyczny, a potem usunęło go, gdy serwer ją odrzucił.
    </p>
    <CodeBlock title="message-board.tsx" code={`
"use client";

import { useActionState, useOptimistic } from "react";
import { useFormStatus } from "react-dom";

export function MessageBoard({ messages }: { messages: string[] }) {
  // Akcja dostaje najpierw poprzedni stan, potem FormData.
  const [state, formAction, isPending] = useActionState(postMessage, { status: "idle" });
  // Pokazane od razu, zastąpione prawdziwą listą, gdy akcja się ustali.
  const [shown, addOptimistic] = useOptimistic(messages, (current, text: string) => [...current, text]);

  function submit(formData: FormData) {
    addOptimistic(String(formData.get("text")));
    formAction(formData);
  }

  return (
    <form action={submit}>
      <input name="text" />
      <SubmitButton />
    </form>
  );
}

// useFormStatus czyta najbliższy formularz nadrzędny, więc działa w potomku.
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Wysyłanie…" : "Wyślij"}</button>;
}
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>useFormStatus</code> widzi tylko formularz nadrzędny.
      </strong>{" "}
      Wywołaj go w komponencie renderującym <code>&lt;form&gt;</code>, a{" "}
      <code>pending</code> nigdy nie będzie true. Wydziel przycisk do
      komponentu potomnego (<code>SubmitButton</code> z demo).
    </li>
    <li>
      <strong>Sygnatura akcji się zmienia.</strong> Opakowana w{" "}
      <code>useActionState</code>, akcja ma postać{" "}
      <code>(previousState, formData)</code>, a nie <code>(formData)</code>.
    </li>
    <li>
      <strong>Formularz resetuje się nawet po błędzie.</strong> Po odrzuceniu
      „fail” pole było puste. Zwróć wysłane wartości w stanie i uzupełnij pole
      przez <code>defaultValue</code>, jeśli ponowienie próby ma znaczenie.
    </li>
    <li>
      <strong>Stan optymistyczny jest tymczasowy.</strong> Istnieje tylko
      podczas działania akcji i wraca do prawdziwej wartości, gdy się ustali, co
      jest też automatycznym wycofaniem przy błędzie. Nie służy do
      przechowywania danych.
    </li>
    <li>
      <strong>Opakowanie akcji kosztuje progressive enhancement.</strong> By
      dodać aktualizację optymistyczną, demo wywołuje <code>formAction</code> z
      własnej funkcji, więc formularz renderuje się z rzucającą akcją{" "}
      <code>javascript:</code> i wymaga JavaScriptu. Używaj hooków bezpośrednio
      na formularzu, gdy liczy się obsługa bez JS.
    </li>
    <li>
      <strong>Oczekiwane błędy zwracaj, nieoczekiwane rzucaj.</strong> Demo
      zwraca <code>rejected</code> jako stan, zamodelowany jako unia
      dyskryminowana i renderowany wyczerpującym <code>switch</code>; rzucenie
      trafiłoby do najbliższego error boundary.
    </li>
    <li>
      <strong>Akcje ustawiają się w kolejce.</strong> Dwukrotne szybkie
      wysłanie uruchamia drugą akcję po pierwszej (zob. temat o podstawach),
      więc lista optymistyczna może pokazać kilka wpisów „wysyłanie…”.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Co zwraca useActionState i co dostaje akcja?",
    answer: (
      <p>
        <code>[state, formAction, isPending]</code>. Akcja jest wywoływana z
        poprzednim stanem i <code>FormData</code>, a jej zwracana wartość staje
        się następnym stanem.
      </p>
    ),
  },
  {
    question: "Dlaczego useFormStatus zwraca pending: false w moim komponencie formularza?",
    answer: (
      <p>
        Czyta status formularza <em>nadrzędnego</em>. Komponent renderujący
        formularz nie jest w jego wnętrzu, więc przenieś hook do komponentu
        potomnego, takiego jak przycisk wysyłania.
      </p>
    ),
  },
  {
    question: "Jak useOptimistic wycofuje nieudaną aktualizację?",
    answer: (
      <p>
        Wartość optymistyczna trwa tylko, gdy akcja jest w toku. Gdy akcja się
        ustali, React renderuje znów z prawdziwej wartości, więc wpis, którego
        serwer nie przyjął, znika bez dodatkowego kodu.
      </p>
    ),
  },
  {
    question: "isPending z useActionState czy pending z useFormStatus?",
    answer: (
      <p>
        <code>isPending</code> jest dostępne tam, gdzie wołasz{" "}
        <code>useActionState</code>. <code>useFormStatus</code> pozwala dowolnemu
        potomkowi formularza (wspólny przycisk, spinner) odczytać to bez
        przekazywania propsów.
      </p>
    ),
  },
  {
    question: "Czy te hooki działają bez JavaScriptu?",
    answer: (
      <p>
        <code>useActionState</code> z Server Action przekazaną bezpośrednio tak:
        demo walidacji zwraca błędy w HTML odpowiedzi na POST bez JS. Funkcja
        opakowująca, którą dodasz wokół akcji (na przykład dla aktualizacji
        optymistycznej), już nie.
      </p>
    ),
  },
  {
    question: "Czy nieudana akcja powinna rzucać, czy zwracać?",
    answer: (
      <p>
        Oczekiwane błędy (walidację, odrzuconą regułę biznesową) zwracaj jako
        stan, by formularz mógł je pokazać; nieoczekiwane niech rzucają do error
        boundary.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Hooki formularzy",
  summary: "useActionState, useFormStatus i useOptimistic.",
  basics,
  edgeCases,
  interviewQuestions,
};
