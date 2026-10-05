import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/server-actions/forms/demo";

export const basics = (
  <>
    <p>
      React pozwala, by <code>&lt;form&gt;</code> przyjął funkcję jako{" "}
      <code>action</code>. Przekaż Server Action, a funkcja dostanie{" "}
      <code>FormData</code> formularza:
    </p>
    <pre>
      <code>{`async function addGuest(role: string, formData: FormData) {
  "use server";
  const name = formData.get("name");   // string | File | null
  // sparsuj, potem zmodyfikuj dane
}

<form action={addGuest.bind(null, "guest")}>
  <input name="name" />
  <button>Dodaj</button>
  <button formAction={clearGuests}>Wyczyść</button>
</form>`}</code>
    </pre>
    <ul>
      <li>
        <code>formData.get(name)</code> zwraca string, <code>File</code> albo{" "}
        <code>null</code>; sparsuj go przed użyciem.
      </li>
      <li>
        <code>.bind(null, value)</code> przekazuje dodatkowe argumenty, które nie
        są polami formularza; docierają przed <code>FormData</code>.
      </li>
      <li>
        <code>formAction</code> na przycisku daje temu samemu formularzowi
        drugą akcję.
      </li>
    </ul>
    <p>
      <strong>Progressive enhancement.</strong> Formularz, którego akcją jest
      Server Action, działa zanim React się zhydratuje i bez JavaScriptu.
      Serwer renderuje go jako <code>method=&quot;POST&quot;</code> z{" "}
      <code>encType=&quot;multipart/form-data&quot;</code> oraz ukrytymi polami{" "}
      <code>$ACTION_*</code> identyfikującymi akcję.{" "}
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> jest takim
      formularzem; gdy zwykły POST (to, co wysyła przeglądarka bez JavaScriptu)
      odtworzono przez <code>curl</code>, odpowiedzią było HTTP 200 z
      zaktualizowaną listą już w HTML.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Funkcja opakowująca psuje ścieżkę bez JS.</strong> Przekazanie
      własnej funkcji do <code>action</code> (by najpierw dodać logikę
      kliencką) renderuje formularz jako{" "}
      <code>action=&quot;javascript:throw new Error(&apos;React form
      unexpectedly submitted.&apos;)&quot;</code>: wysłany przed hydratacją lub
      bez JavaScriptu, nie działa. Przekaż Server Action (albo{" "}
      <code>formAction</code> z <code>useActionState</code>) bezpośrednio, gdy
      potrzebujesz progressive enhancement.
    </li>
    <li>
      <strong>Ukryte pola i związane argumenty można edytować.</strong> Oba są
      widoczne w HTML i można je zmienić w POST. Demo przyjęło podmienioną
      rolę i odrzuciło tę spoza dozwolonych wartości tylko dlatego, że akcja ją
      sparsowała.
    </li>
    <li>
      <strong>Walidacja HTML to UX, nie bezpieczeństwo.</strong>{" "}
      <code>required</code> i <code>maxLength</code> powstrzymują uczciwe
      pomyłki; 31-znakowe imię wysłane bezpośrednio odrzucił dopiero schemat po
      stronie serwera. Waliduj w akcji.
    </li>
    <li>
      <strong>Formularz resetuje się po akcji.</strong> Niekontrolowane pola są
      czyszczone po zakończeniu akcji, nawet gdy się nie powiodła, więc
      wypełnij je ponownie ze zwróconych wartości, jeśli użytkownik może
      chcieć ponowić próbę (następne tematy).
    </li>
    <li>
      <strong>Nie zmienisz metody ani kodowania.</strong> Przy akcji będącej
      funkcją React wysyła <code>POST</code> jako multipart form data;
      ustawione <code>method</code> lub <code>encType</code> są ignorowane.
    </li>
    <li>
      <strong>Druga akcja na formularz wymaga <code>formAction</code> na
      przycisku.</strong> Pamiętaj o <code>formNoValidate</code> na przycisku
      takim jak &quot;Wyczyść&quot;, którego nie mają blokować wymagane pola.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak działa <form action={serverAction}>?",
    answer: (
      <p>
        React rozszerza <code>&lt;form&gt;</code>, tak że jego{" "}
        <code>action</code> może być funkcją. Server Action dostaje{" "}
        <code>FormData</code>; po hydratacji React wysyła go przez{" "}
        <code>fetch</code>, a Next.js zwraca w odpowiedzi nowy UI i dane.
      </p>
    ),
  },
  {
    question: "Czym jest progressive enhancement i jak dotyczy to tutaj?",
    answer: (
      <p>
        Formularz działa bez JavaScriptu klienta: serwer renderuje prawdziwy
        formularz <code>POST</code> z ukrytymi polami identyfikującymi akcję,
        więc przeglądarka może go wysłać przed hydratacją lub z wyłączonymi
        skryptami. Z JavaScriptem ten sam formularz przechodzi na wysyłkę w
        obrębie strony.
      </p>
    ),
  },
  {
    question: "Jak przekazać do akcji dodatkowe dane poza polami formularza?",
    answer: (
      <p>
        Użyj <code>.bind(null, value)</code>, ukrytego inputu albo domknięcia
        akcji inline. Wszystkie docierają do serwera przez żądanie, więc
        traktuj je jako niezaufane dane wejściowe: parsuj je i nigdy nie opieraj
        na nich autoryzacji.
      </p>
    ),
  },
  {
    question: "Jak przypiąć do formularza więcej niż jedną akcję?",
    answer: (
      <p>
        Dodaj <code>formAction={"{otherAction}"}</code> na przycisku submit.
        Akcja przycisku zastępuje akcję formularza dla tej wysyłki.
      </p>
    ),
  },
  {
    question: "Jeśli inputy mają required i maxLength, po co walidować na serwerze?",
    answer: (
      <p>
        Te sprawdzenia działają w przeglądarce, więc każdy może je ominąć
        bezpośrednim żądaniem. Serwer to jedyne miejsce, które może wymusić
        reguły, więc akcja musi sama sparsować dane wejściowe.
      </p>
    ),
  },
  {
    question: "Dlaczego opakowana akcja może zepsuć formularz bez JavaScriptu?",
    answer: (
      <p>
        Napisana przez ciebie funkcja istnieje tylko w bundlu klienta, więc
        wyrenderowany na serwerze formularz nie ma dokąd wysłać POST. Next.js
        renderuje zastępczą akcję, która rzuca błąd, jeśli formularz zostanie
        wysłany przed hydratacją.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Formularze",
  summary: "form action i progressive enhancement.",
  basics,
  edgeCases,
  interviewQuestions,
};
