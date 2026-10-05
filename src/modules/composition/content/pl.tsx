import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/components/composition/demo";

const basics = (
  <>
    <p>
      Server i Client Components zagnieżdżają się w obu kierunkach, ale graf{" "}
      <em>importów</em> i drzewo <em>renderowania</em> to dwie różne rzeczy.
      Client Component nie może zaimportować Server Componentu (import
      zamienia go w kod kliencki), ale może go <strong>otrzymać</strong> jako{" "}
      <code>children</code> (lub inny prop) od Server Componentu wyżej.
    </p>
    <pre>
      <code>{`// Server Component: właściciel kompozycji
<Collapsible title="...">      // "use client", ma stan
  <ServerFactsPanel />         // Server Component, renderowany najpierw
</Collapsible>`}</code>
    </pre>
    <p>
      Serwer renderuje najpierw <code>ServerFactsPanel</code> i przekazuje wynik
      do <code>Collapsible</code> jako gotowy output. Klient nigdy nie dostaje
      kodu Server Componentu, tylko jego wynik. To wzorzec{" "}
      <em>przeplatania</em> (interleaving): trzymaj interaktywne opakowania
      (modale, zakładki, providery) jako małe Client Components, a ciężką treść
      przekazuj przez <code>children</code>.
    </p>
    <p>
      Wypróbuj <LocalizedLink href={demoHref}>demo</LocalizedLink>. Ukryj i pokaż panel: znacznik
      czasu serwera w środku się nie zmienia, bo przełączanie to stan klienta, a
      treść została wyrenderowana raz na serwerze. Panel „Pod maską” przeszukuje
      załadowane chunki JavaScript i pokazuje, że kod modułu server-only nie
      trafił do przeglądarki.
    </p>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Import Server Componentu do pliku klienckiego go konwertuje.</strong>{" "}
      Moduł trafia do grafu klienckiego, traci możliwości serwerowe i jest
      bundlowany dla przeglądarki. Przekaż go zamiast tego jako{" "}
      <code>children</code> z Server Componentu.
    </li>
    <li>
      <strong>
        <code>server-only</code> zamienia ten błąd w błąd builda.
      </strong>{" "}
      Import modułu zaczynającego się od{" "}
      <code>import &quot;server-only&quot;</code> z Client Componentu kończy
      się błędem{" "}
      <em>&quot;&apos;server-only&apos; cannot be imported from a Client
      Component module&quot;</em>. Użyj go do dostępu do danych i wszystkiego, co
      czyta sekrety.
    </li>
    <li>
      <strong>Sprawdzaj bundle, nie tylko UI.</strong> Znacznik modułu
      server-only pojawia się w wyrenderowanym wyniku, ale w żadnym z klienckich
      chunków JavaScript, i to właśnie znaczy „kod zostaje na serwerze”.
    </li>
    <li>
      <strong>Renderuj providery jak najgłębiej.</strong> Opakuj tylko{" "}
      <code>children</code> w kliencki provider, a nie całe{" "}
      <code>&lt;html&gt;</code>, by statyczne części drzewa dało się
      optymalizować.
    </li>
    <li>
      <strong>Propsy niosące JSX nadal podlegają serializacji.</strong>{" "}
      Wyrenderowany element jest w porządku; funkcja renderująca (
      <code>{"render={() => <X />}"}</code>) to funkcja i nie przejdzie.
    </li>
    <li>
      <strong>Dzieci per żądanie potrzebują <code>&lt;Suspense&gt;</code>.</strong>{" "}
      Przy Cache Components Server Component czytający dane runtime (tu{" "}
      <code>connection()</code>) musi stać za granicą, nawet gdy jest
      zagnieżdżony w kliencki wrapper.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czy Client Component może renderować Server Component?",
    answer: (
      <p>
        Nie przez import: to zamienia importowany moduł w kod kliencki. Ale
        Server Component może przekazać inny Server Component do Client
        Componentu jako <code>children</code> (lub inny prop). Serwer renderuje
        go najpierw, a klient tylko umieszcza wynik.
      </p>
    ),
  },
  {
    question: "Dlaczego przełączanie dzieci Client Componentu nic nie pobiera ponownie?",
    answer: (
      <p>
        Dzieci są renderowane na serwerze, zanim Client Component się uruchomi,
        i docierają jako zserializowany output. Stan klienta decyduje tylko, czy
        je pokazać. Nic nie jest ponownie renderowane na serwerze, co widać po
        niezmieniającym się znaczniku czasu w demie.
      </p>
    ),
  },
  {
    question: "Co robi pakiet server-only?",
    answer: (
      <p>
        Jego import czyni moduł nieużywalnym z grafu klienckiego: jeśli Client
        Component (bezpośrednio lub pośrednio) zaimportuje ten moduł, build się
        nie powiedzie. Chroni sekrety i kod dostępu do danych przed cichym
        wylądowaniem w bundlu przeglądarki.
      </p>
    ),
  },
  {
    question: "Gdzie w App Routerze umieszczać providery kontekstu?",
    answer: (
      <p>
        W małym Client Componencie przyjmującym <code>children</code>, jak
        najgłębiej to praktyczne. Root layout (Server Component) renderuje
        provider wokół <code>{"{children}"}</code>, więc kodem klienckim jest
        tylko to, co potrzebuje kontekstu.
      </p>
    ),
  },
  {
    question: "Czym jest wzorzec przeplatania (interleaving)?",
    answer: (
      <p>
        Zagnieżdżaniem Server Components w Client Components przez propsy,
        komponowanym w Server Componencie. Utrzymuje małe interaktywne
        opakowania, a treść, którą opakowują, zostaje na serwerze i poza bundlem
        klienta.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Kompozycja",
  summary: "Przekazywanie komponentów klienckich jako children do komponentów serwerowych.",
  basics,
  edgeCases,
  interviewQuestions,
};
