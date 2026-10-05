import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/components/use-client-boundary/demo";

const basics = (
  <>
    <p>
      W App Routerze każdy komponent to <strong>Server Component</strong>,
      dopóki moduł z tego nie zrezygnuje. Dodanie{" "}
      <code>&quot;use client&quot;</code> na początku pliku oznacza go jako{" "}
      <em>punkt wejścia</em> klienckiego grafu modułów: ten plik i wszystko, co
      importuje, trafia do bundla dla przeglądarki. Nie znaczy to „działa
      tylko w przeglądarce”: Client Components nadal są prerenderowane do HTML
      na serwerze, a potem hydratowane.
    </p>
    <p>
      Dyrektywa rysuje granicę, a to, co ją przekracza, jest{" "}
      <strong>serializowane</strong> do ładunku RSC:
    </p>
    <ul>
      <li>
        Dozwolone: stringi, liczby, <code>bigint</code>, wartości logiczne,{" "}
        <code>undefined</code>, <code>null</code>, <code>Date</code>,{" "}
        <code>Map</code>, <code>Set</code>, tablice, zwykłe obiekty,
        wyrenderowany JSX (np. <code>children</code>), Promise&apos;y i Server
        Actions.
      </li>
      <li>
        Niedozwolone: zwykłe funkcje (w tym event handlery), instancje klas i
        obiekty z prototypem null.
      </li>
    </ul>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> wysyła z Server Componentu po jednym
      dozwolonym rodzaju. Client Component wypisuje, co dostał: <code>Date</code>{" "}
      nadal jest <code>Date</code>, a <code>Map</code> nadal <code>Map</code>.
      Panel „Pod maską” pokazuje te same wartości w surowym ładunku RSC, tak jak
      wyszły z serwera.
    </p>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Prop będący funkcją wywala build.</strong> Przekazanie{" "}
      <code>callback={"{() => 1}"}</code> z Server Componentu daje:{" "}
      <em>
        &quot;Functions cannot be passed directly to Client Components unless
        you explicitly expose it by marking it with &quot;use server&quot;.&quot;
      </em>{" "}
      Event handler daje pokrewny błąd{" "}
      <em>&quot;Event handlers cannot be passed to Client Component
      props.&quot;</em>
    </li>
    <li>
      <strong>Instancja klasy wywala build.</strong>{" "}
      <em>
        &quot;Only plain objects, and a few built-ins, can be passed to Client
        Components from Server Components. Classes or null prototypes are not
        supported.&quot;</em>{" "}
      Najpierw zamień ją na zwykły obiekt (i odbuduj klasę po stronie klienta,
      jeśli potrzebujesz jej metod).
    </li>
    <li>
      <strong>Dyrektywa dotyczy grafu modułów, nie pliku.</strong> Komponent
      importowany przez plik z <code>&quot;use client&quot;</code> staje się
      częścią bundla klienckiego nawet bez własnej dyrektywy, więc umieszczaj
      dyrektywę na możliwie najmniejszym punkcie wejścia.
    </li>
    <li>
      <strong>Wszystko, co przekażesz, trafia do przeglądarki.</strong> Prop
      staje się częścią ładunku strony, widoczną w zakładce Network. Przekazuj
      pola potrzebne UI, a nie cały wiersz z bazy.
    </li>
    <li>
      <strong>Client Components nadal najpierw renderują się na serwerze.</strong>{" "}
      API dostępne tylko w przeglądarce, jak <code>window</code>, jest w tym
      przebiegu niedostępne, więc chroń je warunkiem albo czytaj po hydracji.
    </li>
    <li>
      <strong>Właściwość obiektu równa <code>undefined</code> traci klucz.</strong>{" "}
      Wartość przechodzi poprawnie (ładunek niesie <code>$undefined</code>), ale
      wewnątrz obiektu sam klucz znika po dotarciu:{" "}
      <code>&quot;nothing&quot; in values</code> to <code>false</code>, a{" "}
      <code>values.nothing</code> nadal daje <code>undefined</code>. Demo
      oznacza ten wiersz.
    </li>
    <li>
      <strong>Propsy to migawka.</strong> Wartość jest serializowana w czasie
      renderowania; <code>Date</code> lub <code>Map</code>, które dotrą do
      klienta, to kopia, a nie współdzielona referencja.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Co właściwie robi \"use client\"?",
    answer: (
      <p>
        Oznacza moduł jako punkt wejścia klienckiego grafu modułów. Moduł i
        wszystko, co importuje, trafia do przeglądarki i tam się hydratuje.
        Komponenty nadal są prerenderowane do HTML na serwerze; dyrektywa nie
        oznacza „tylko przeglądarka”.
      </p>
    ),
  },
  {
    question: "Co można przekazać jako propsy z Server Componentu do Client Componentu?",
    answer: (
      <p>
        Wszystko, co React potrafi zserializować: prymitywy (w tym{" "}
        <code>bigint</code>), <code>Date</code>, <code>Map</code>,{" "}
        <code>Set</code>, tablice, zwykłe obiekty, JSX, Promise&apos;y i Server
        Actions. Zwykłe funkcje, instancje klas i obiekty z prototypem null nie
        mogą przekroczyć granicy.
      </p>
    ),
  },
  {
    question: "Dlaczego nie można przekazać handlera onClick z Server Componentu?",
    answer: (
      <p>
        Funkcja musiałaby zostać zserializowana do ładunku, a dowolne funkcje
        nie są serializowalne. Przenieś część interaktywną do Client Componentu,
        który sam definiuje handler. Jedyne funkcje, które mogą przejść, to
        Server Actions (<code>&quot;use server&quot;</code>), przekazywane jako
        referencje.
      </p>
    ),
  },
  {
    question: "Czy komponent importowany do pliku z \"use client\" potrzebuje własnej dyrektywy?",
    answer: (
      <p>
        Nie. Zaimportowanie go z klienckiego punktu wejścia wciąga go do bundla
        klienta. Dlatego dyrektywę trzymaj nisko w drzewie: dyrektywa na layoucie
        zrobiłaby z całego poddrzewa kod kliencki.
      </p>
    ),
  },
  {
    question: "Czy Client Component renderuje się tylko w przeglądarce?",
    answer: (
      <p>
        Nie. Jest prerenderowany do HTML na serwerze, a potem hydratowany. Kod
        sięgający po <code>window</code> lub <code>document</code> podczas
        renderowania psuje ten pierwszy przebieg.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Granica use client",
  summary: "Co może, a co nie może przekroczyć granicy jako propsy.",
  basics,
  edgeCases,
  interviewQuestions,
};
