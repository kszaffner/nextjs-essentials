import { LocalizedLink } from "@/shared/i18n";
import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";

const demoHref = "/optimization/dynamic-import/demo";

const basics = (
  <>
    <p>
      <code>next/dynamic</code> ładuje kod komponentu dopiero wtedy, gdy jest
      potrzebny, w osobnym chunku. To połączenie <code>React.lazy()</code> i{" "}
      <code>&lt;Suspense&gt;</code>.
    </p>
    <pre>
      <code>{`"use client";

const Heavy = dynamic(() => import("./HeavyPanel").then((m) => m.HeavyPanel), {
  ssr: false,                       // pomiń render na serwerze
  loading: () => <p>Ładowanie…</p>, // pokazywane, gdy chunk się ładuje
});

{isOpen ? <Heavy /> : null}          // chunk jest pobierany przy pierwszym renderze`}</code>
    </pre>
    <ul>
      <li>
        <strong>Server Components</strong> są dzielone na chunki automatycznie;
        nie trzeba nic robić.
      </li>
      <li>
        <strong>Client Components</strong> trafiają do bundla strony, chyba że
        odroczysz je przez <code>dynamic()</code>.
      </li>
      <li>
        <code>ssr: false</code> usuwa też komponent z HTML-a z serwera, co
        pasuje do rzeczy wymagających przeglądarki (wykres, edytor).
      </li>
    </ul>
    <p>
      Wypróbuj <LocalizedLink href={demoHref}>demo</LocalizedLink>. Zaobserwowano na buildzie
      produkcyjnym: ciężki panel (<code>ssr: false</code>) nie był w HTML-u z
      serwera i nie miał preloadu; jego kod to osobny chunk; otwarcie go pobrało
      dokładnie jeden nowy skrypt (22 skrypty przy załadowaniu, 23 po). Drugi
      panel to dynamiczny import, który <em>jest</em> renderowany na serwerze:
      jest w HTML-u, ale jego JavaScript nadal trafia do osobnego chunku. (Chunki
      w demie mają około 1 KB; liczy się mechanizm, a realne zyski daje
      odroczenie dużych bibliotek.)
    </p>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>ssr: false</code> działa tylko w Client Components.
      </strong>{" "}
      W Server Componencie build kończy się błędem:{" "}
      <em>
        &quot;`ssr: false` is not allowed with `next/dynamic` in Server
        Components. Please move it into a Client Component.&quot;
      </em>{" "}
      Wywołania <code>dynamic()</code> w demie leżą w pliku z{" "}
      <code>&quot;use client&quot;</code>.
    </li>
    <li>
      <strong>Server Component nie podzieli w ten sposób Client Componentu.</strong>{" "}
      Gdy Server Component importuje dynamicznie Client Component, automatyczny
      podział kodu nie jest obecnie wspierany, więc opakuj wywołanie{" "}
      <code>dynamic()</code> w Client Componencie.
    </li>
    <li>
      <strong>Brak HTML-a z serwera to brak treści dla crawlerów.</strong> Przy{" "}
      <code>ssr: false</code> w pierwszym HTML-u nie ma nic z komponentu
      (zweryfikowane dla ciężkiego panelu). Nie używaj tego dla treści, które
      mają być zaindeksowane lub są nad linią zgięcia.
    </li>
    <li>
      <strong>Zarezerwuj miejsce.</strong> Komponent, który pojawia się po
      załadowaniu chunku, może przesunąć layout. Nadaj fallbackowi{" "}
      <code>loading</code> (lub jego kontenerowi) docelowy rozmiar.
    </li>
    <li>
      <strong>Nazwane eksporty potrzebują adaptera.</strong>{" "}
      <code>dynamic()</code> oczekuje domyślnego eksportu; dla nazwanego
      zwróć go z importu:{" "}
      <code>.then((module) =&gt; module.HeavyPanel)</code>.
    </li>
    <li>
      <strong>Odraczaj to, co duże i rzadko używane.</strong> Dzielenie małego
      komponentu dodaje żądanie sieciowe bez zysku. Dobre kandydaty to modale,
      wykresy, edytory i biblioteki za kliknięciem; można też wywołać{" "}
      <code>await import(&quot;library&quot;)</code> w event handlerze.
    </li>
    <li>
      <strong>Miejsce żądania ma znaczenie.</strong> Chunk jest pobierany przy
      pierwszym renderze komponentu dynamicznego, a nie przy ładowaniu strony,
      więc na wolnej sieci użytkownik zobaczy fallback <code>loading</code>.
      Jeśli opóźnienie przeszkadza, prefetchuj po najechaniu myszą.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Co robi next/dynamic?",
    answer: (
      <p>
        Ładuje komponent leniwie: jego kod trafia do osobnego chunku
        pobieranego przy pierwszym renderze komponentu, z opcjonalnym
        fallbackiem <code>loading</code>. Łączy <code>React.lazy()</code> i{" "}
        <code>Suspense</code> i działa tak samo w App Routerze.
      </p>
    ),
  },
  {
    question: "Co zmienia ssr: false i gdzie jest dozwolone?",
    answer: (
      <p>
        Komponent jest pomijany przy renderze na serwerze i renderuje się tylko
        w przeglądarce, więc nic z niego nie ma w pierwszym HTML-u. Dozwolone
        tylko w Client Components; w Server Componencie build się nie
        powiedzie.
      </p>
    ),
  },
  {
    question: "Czy Server Components potrzebują dynamicznych importów do podziału kodu?",
    answer: (
      <p>
        Nie. Server Components są dzielone automatycznie i nigdy nie trafiają
        do przeglądarki jako JavaScript. <code>dynamic()</code> służy do
        Client Components i bibliotek po stronie klienta.
      </p>
    ),
  },
  {
    question: "Kiedy dynamiczny import to zły pomysł?",
    answer: (
      <p>
        Dla małych komponentów, treści nad linią zgięcia i wszystkiego, co musi
        być w HTML-u z serwera dla SEO. Dodaje żądanie i stan ładowania bez
        znaczącej oszczędności bundla.
      </p>
    ),
  },
  {
    question: "Jak załadować ciężką bibliotekę dopiero po kliknięciu?",
    answer: (
      <p>
        Albo wyrenderować komponent <code>dynamic()</code> po kliknięciu, albo
        wywołać <code>await import(&quot;library&quot;)</code> w handlerze
        kliknięcia. Bundler umieszcza bibliotekę w osobnym chunku pobieranym
        przy pierwszym użyciu.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "next/dynamic",
  summary: "Podział kodu i ssr: false.",
  basics,
  edgeCases,
  interviewQuestions,
};
