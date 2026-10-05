import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/server-actions/basics/demo";

export const basics = (
  <>
    <p>
      <strong>Server Function</strong> to asynchroniczna funkcja, która działa
      na serwerze i jest wywoływana z klienta przez żądanie sieciowe. Użyta do
      mutacji (akcja formularza, <code>formAction</code> przycisku albo
      handler w tranzycji) nazywa się <strong>Server Action</strong>. Dwa
      sposoby jej zdefiniowania:
    </p>
    <ul>
      <li>
        <strong>Inline</strong>, z <code>&quot;use server&quot;</code> jako
        pierwszą linią funkcji async wewnątrz <em>Server</em> Component.
      </li>
      <li>
        <strong>W module</strong>, z <code>&quot;use server&quot;</code> na
        górze pliku. To jedyny sposób, by dać <em>Client</em> Component akcję:
        importuje ją.
      </li>
    </ul>
    <p>
      Za kulisami akcja to HTTP <code>POST</code> i tylko POST może ją
      wywołać. Gdy się wykonuje, Next.js może zwrócić zaktualizowany UI i nowe
      dane w jednej rundzie.
    </p>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> ma akcję inline za
      zwykłym formularzem oraz zaimportowaną akcję wywoływaną z handlera
      kliknięcia. Obie zwiększają licznik na serwerze, który aktualizuje się 600
      ms, a potem odświeżają stronę.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Akcja to publiczny endpoint.</strong> Każdy może wysłać do niej
      POST bezpośrednio, nie tylko przez twój UI (kontrole demo bez JS robiły
      dokładnie to przez <code>curl</code>). Uwierzytelniaj i autoryzuj wewnątrz
      każdej akcji; ukryty lub wyłączony przycisk nie jest ochroną.
    </li>
    <li>
      <strong>Wszystko, co wysyła klient, jest niezaufane, także związane
      argumenty.</strong> Wartość związana przez{" "}
      <code>.bind(null, &quot;guest&quot;)</code> pojawia się jawnym tekstem w
      HTML strony (<code>[&quot;guest&quot;]</code>). Podmiana na{" "}
      <code>[&quot;vip&quot;]</code> w POST została przyjęta;{" "}
      <code>[&quot;admin&quot;]</code> odrzucono tylko dlatego, że akcja
      sparsowała ją względem enuma. Parsuj każdy argument schematem.
    </li>
    <li>
      <strong>Żądania międzydomenowe są odrzucane.</strong> Next.js porównuje
      nagłówek <code>Origin</code> z hostem. POST z obcym <code>Origin</code>{" "}
      został odrzucony (HTTP 500 w tej wersji), a ten z tego samego origin
      przeszedł. Za reverse proxy wypisz swoje domeny w{" "}
      <code>serverActions.allowedOrigins</code>.
    </li>
    <li>
      <strong>Wywołania są wysyłane po jednym.</strong> Trzy wywołania
      wystrzelone razem w demo wróciły po około 629, 1246 i 1861 ms: każde
      czeka na poprzednie. Akcje służą do mutacji, nie do równoległego
      ładowania danych (zob. temat o pobieraniu).
    </li>
    <li>
      <strong>Plik kliencki nie może zadeklarować akcji inline.</strong>{" "}
      Wstawienie <code>&quot;use server&quot;</code> w funkcji wewnątrz pliku{" "}
      <code>&quot;use client&quot;</code> kończy build mylącym błędem{" "}
      <em>&quot;The &quot;use client&quot; directive must be placed before
      other expressions.&quot;</em> Przenieś akcję do pliku{" "}
      <code>&quot;use server&quot;</code>.
    </li>
    <li>
      <strong>Plik &quot;use server&quot; eksportuje tylko funkcje async.</strong>{" "}
      Stała kończy się błędem{" "}
      <em>&quot;Only async functions are allowed to be exported in a &quot;use
      server&quot; file.&quot;</em> Typy i stałe trzymaj w osobnym pliku.
    </li>
    <li>
      <strong>Domknięcia są szyfrowane, nie tajne.</strong> Zmienne, które
      przechwytuje akcja inline, są szyfrowane, zanim trafią do klienta, a ID
      akcji są szyfrowane, z usuwaniem nieużywanych akcji z bundli klienta.
      Mimo to nie przechwytuj sekretów. Wdrożenia self-hosted z wieloma
      instancjami potrzebują stałego{" "}
      <code>NEXT_SERVER_ACTIONS_ENCRYPTION_KEY</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym różni się Server Function od Server Action?",
    answer: (
      <p>
        Server Function to dowolna funkcja async działająca na serwerze i
        wywoływana z klienta przez sieć. Server Action to Server Function użyta
        do mutacji: przekazana do <code>action</code> formularza,{" "}
        <code>formAction</code> przycisku albo wywołana w tranzycji.
      </p>
    ),
  },
  {
    question: "Gdzie można zdefiniować Server Action?",
    answer: (
      <p>
        Inline w Server Component (<code>&quot;use server&quot;</code> w ciele
        funkcji) albo w pliku oznaczonym <code>&quot;use server&quot;</code>.
        Client Components nie mogą definiować jej inline; importują akcję z
        pliku <code>&quot;use server&quot;</code>.
      </p>
    ),
  },
  {
    question: "Czy Server Actions są domyślnie bezpieczne?",
    answer: (
      <p>
        Częściowo: tylko POST, sprawdzają <code>Origin</code> względem hosta,
        szyfrują ID akcji i zmienne domknięcia oraz usuwają nieużywane akcje z
        bundli klienta. Nadal są publicznymi endpointami, więc wewnątrz każdej
        trzeba uwierzytelniać, autoryzować i walidować dane wejściowe.
      </p>
    ),
  },
  {
    question: "Dlaczego nie używać Server Actions do pobierania danych?",
    answer: (
      <p>
        Są wysyłane po jednej na klienta i używają POST, więc równoległe odczyty
        ustawiałyby się w kolejce, a nic nie jest cache&apos;owane. Pobieraj w
        Server Components (lub Route Handlerach); akcji używaj do zmiany
        danych.
      </p>
    ),
  },
  {
    question: "Dlaczego trzeba walidować związane argumenty?",
    answer: (
      <p>
        Związane argumenty podróżują z żądaniem i widać je w HTML strony, więc
        wołający może je zmienić. Traktuj je jak pola formularza: parsuj
        schematem i nigdy nie pozwól, by związana wartość decydowała o
        autoryzacji.
      </p>
    ),
  },
  {
    question: "Co akcja zwraca klientowi?",
    answer: (
      <p>
        Serializowalną wartość oraz (gdy rewaliduje lub odświeża) zaktualizowany
        UI w tej samej odpowiedzi. Oczekiwane błędy najlepiej zwracać jako dane;
        rzucone błędy trafiają do error boundary.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Podstawy Server Actions",
  summary: '"use server" i wywoływanie akcji z Client i Server Components.',
  basics,
  edgeCases,
  interviewQuestions,
};
