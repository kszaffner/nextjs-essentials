import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/testing/server-vs-client/demo";

export const basics = (
  <>
    <p>
      To, czym testujesz, zależy od rodzaju komponentu. Ten projekt używa
      Vitest z React Testing Library i jsdom (<code>pnpm test</code>).
    </p>
    <ul>
      <li>
        <strong>Synchroniczne Server Components</strong> i zwykłe komponenty
        prezentacyjne to po prostu funkcje zwracające JSX: wyrenderuj je i
        sprawdzaj to, co widzi użytkownik (<code>GreetingCard</code>).
      </li>
      <li>
        <strong>Client Components</strong> potrzebują DOM, zdarzeń użytkownika i
        zastępnika App Routera: zamockuj <code>next/navigation</code> i klikaj (
        <code>FavouriteButton</code>).
      </li>
      <li>
        <strong>Asynchronicznych Server Components</strong> renderer testowy nie
        wyrenderuje jako JSX. Next.js zaleca dla nich testy end-to-end;
        praktyczny wzorzec na poziomie jednostkowym to wywołać komponent jak
        funkcję, poczekać na wynik i wyrenderować go, wstrzykując źródło danych
        jako prop (<code>AsyncProfileCard</code>).
      </li>
    </ul>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> renderuje te trzy obok
      siebie; ich testy leżą obok nich w{" "}
      <code>src/modules/testing-components/components</code>.
    </p>
    <CodeBlock code={`// wzorzec, który działa dla asynchronicznego Server Component
render(await AsyncProfileCard({ profileId: "ada", loadProfile }));`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Renderowanie komponentu async jako JSX przechodzi po cichu.</strong>{" "}
      Nie rzuca: nic nie renderuje. Test, który renderuje{" "}
      <code>&lt;AsyncProfileCard /&gt;</code> i sprawdza tylko, że nic się nie
      wywaliło, byłby zielony, nie testując niczego. Repozytorium ma test, który
      to dokumentuje (tekst kontenera jest pusty) i głośno się wywali, jeśli
      React zacznie to wspierać.
    </li>
    <li>
      <strong>Wstrzykuj źródło danych.</strong> Karta async przyjmuje{" "}
      <code>loadProfile</code> jako prop, więc test podaje atrapę, brakujący
      profil albo zawodzący loader bez sieci, bazy danych i mockowania modułów.
    </li>
    <li>
      <strong>Błędy propagują z założenia.</strong> Rzucający loader sprawia, że
      komponent się odrzuca; w aplikacji łapie to error boundary. Test sprawdza
      odrzucenie zamiast je połykać.
    </li>
    <li>
      <strong>Mockuj router, nie komponent.</strong> <code>useRouter</code>{" "}
      działa tylko wewnątrz App Routera, więc test zastępuje{" "}
      <code>next/navigation</code> szpiegiem i sprawdza cel, o który komponent
      poprosił.
    </li>
    <li>
      <strong>Moduły server-only potrzebują stuba.</strong> Kod importujący{" "}
      <code>server-only</code> rzuca w teście, bo test nie jest w grafie modułów
      serwera; zastąp go przez{" "}
      <code>vi.mock(&quot;server-only&quot;, () =&gt; ({"{}"}))</code>.
    </li>
    <li>
      <strong>Testy jednostkowe nie obejmują streamingu, cache ani layoutu.</strong>{" "}
      Fallbacki Suspense, statyczne powłoki i error boundary między trasami
      potrzebują przeglądarki. To repozytorium nie ma jeszcze zestawu
      Playwright; te zachowania sprawdzano ręcznie na buildach produkcyjnych
      (pull requesty wymieniają, co zaobserwowano), a zestaw end-to-end dla
      kluczowych ścieżek to naturalny następny krok.
    </li>
    <li>
      <strong>Testuj zachowanie, nie strukturę.</strong> Zapytania po roli i
      tekście (<code>getByRole(&quot;button&quot;, ...)</code>) przeżywają
      refaktoryzację; asercje na nazwach klas czy wnętrzach komponentu nie.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak testować Server Component?",
    answer: (
      <p>
        Jeśli jest synchroniczny, wyrenderuj go jak każdy komponent. Jeśli jest
        async, renderer testowy nie wyrenderuje go jako JSX, więc albo wywołaj go
        jak funkcję i wyrenderuj oczekiwany wynik (wstrzykując źródło danych),
        albo przetestuj trasę end-to-end w przeglądarce.
      </p>
    ),
  },
  {
    question: "Dlaczego test komponentu async może przejść, nie testując niczego?",
    answer: (
      <p>
        Wyrenderowanie go jako JSX nie daje ani wyniku, ani błędu, więc asercje
        „nic się nie wywaliło” się udają. Zawsze sprawdzaj widoczną treść, która
        zawiedzie przy pustym renderze.
      </p>
    ),
  },
  {
    question: "Jak testować Client Component używający useRouter?",
    answer: (
      <p>
        Zamockuj <code>next/navigation</code>, by <code>useRouter</code> zwracał
        szpiega, wyrenderuj komponent, wejdź z nim w interakcję i sprawdź, że{" "}
        <code>push</code> wywołano z oczekiwaną ścieżką.
      </p>
    ),
  },
  {
    question: "Co Next.js zaleca dla asynchronicznych Server Components?",
    answer: (
      <p>
        Testy end-to-end, bo Vitest i testowy renderer Reacta jeszcze nie
        wspierają asynchronicznych Server Components. Testy jednostkowe nadal są w
        porządku dla synchronicznych Server Components i Client Components.
      </p>
    ),
  },
  {
    question: "Jak ułatwić testowanie komponentu?",
    answer: (
      <p>
        Przekazuj jego zależności (funkcję loadera, id) zamiast importować
        konkretne źródło danych, trzymaj logikę w czystych funkcjach i niech
        komponent będzie cienki, by każda część miała tani test.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Server vs Client Components",
  summary: "Testowanie każdego rodzaju komponentu.",
  basics,
  edgeCases,
  interviewQuestions,
};
