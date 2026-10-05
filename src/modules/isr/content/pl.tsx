import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/rendering/isr/demo";

const basics = (
  <>
    <p>
      Incremental Static Regeneration serwuje prerenderowany wynik i przebudowuje
      go w tle, więc strony są szybkie jak pliki statyczne, a nie zamrożone w
      czasie builda. Przy Cache Components (włączonych w tym projekcie) ISR
      wyraża się na cache&apos;owanych danych, a nie na trasie:
    </p>
    <pre>
      <code>{`async function getCatalogSnapshot() {
  "use cache";
  cacheLife({ stale: 300, revalidate: 10, expire: 600 });
  cacheTag("catalog");
  return loadCatalog();
}`}</code>
    </pre>
    <ul>
      <li>
        <strong>Czasowo:</strong> <code>cacheLife({"{ revalidate }"})</code>{" "}
        określa, jak długo wynik jest uznawany za świeży. Następne żądanie po
        tym czasie nadal dostaje stary wynik i wyzwala regenerację
        (stale-while-revalidate); kolejne dostaje już nowy.
      </li>
      <li>
        <strong>Na żądanie:</strong> otaguj dane przez <code>cacheTag</code> i
        wywołaj <code>revalidateTag(tag, &quot;max&quot;)</code> z Server Action
        lub Route Handlera, gdy zmieni się źródło.
      </li>
      <li>
        <code>expire</code> to twardy limit: gdy minie bez ruchu, następne
        żądanie czeka na świeże dane zamiast dostać nieaktualne.
      </li>
    </ul>
    <p>
      Wyjście builda pokazuje czas życia obok trasy:{" "}
      <code>○ /rendering/isr/demo 10s 10m</code> (revalidate, expire). Otwórz{" "}
      <LocalizedLink href={demoHref}>demo</LocalizedLink>, zapamiętaj znacznik czasu, odczekaj
      ponad 10 sekund i przeładuj dwa razy. Albo naciśnij przycisk: tuż po tym
      strona nadal pokazuje starą wartość, a następne przeładowanie
      zregenerowaną.
    </p>
    <p>
      <em>Kontrast (poprzedni model):</em> <code>export const revalidate = 60</code>{" "}
      na trasie albo <code>getStaticProps</code> zwracające{" "}
      <code>revalidate</code> w Pages Routerze.
    </p>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>export const revalidate</code> już się nie buduje.
      </strong>{" "}
      Przy Cache Components kończy się błędem{" "}
      <em>
        &quot;Route segment config &quot;revalidate&quot; is not compatible
        with `nextConfig.cacheComponents`. Please remove it.&quot;
      </em>{" "}
      Czas życia ustaw na cache&apos;owanej funkcji przez <code>cacheLife</code>.
    </li>
    <li>
      <strong>Regenerację wyzwala żądanie, nie timer.</strong> Nic się nie
      dzieje, gdy interwał minie; pierwsza wizyta po nim dostaje nieaktualny
      wynik i uruchamia przebudowę. To samo dotyczy{" "}
      <code>revalidateTag</code>: wywołanie tylko oznacza dane jako nieaktualne,
      a strony rewalidują się, gdy są odwiedzane.
    </li>
    <li>
      <strong>Krótki czas życia wyrzuca z statycznej powłoki.</strong>{" "}
      <code>revalidate</code> równe <code>0</code>, <code>expire</code> poniżej
      pięciu minut albo <code>stale</code> poniżej 30 sekund wyklucza wynik z
      prerenderu, zamieniając go w dynamiczną dziurę wymagającą granicy{" "}
      <code>&lt;Suspense&gt;</code>. Demo używa{" "}
      <code>stale: 300, revalidate: 10, expire: 600</code>, by pozostać
      prerenderowane.
    </li>
    <li>
      <strong>
        <code>expire</code> musi być dłuższe niż <code>revalidate</code>.
      </strong>{" "}
      Next.js odrzuca odwrotność.
    </li>
    <li>
      <strong>
        <code>revalidateTag</code> przyjmuje profil jako drugi argument.
      </strong>{" "}
      Forma jednoargumentowa jest przestarzała. <code>&quot;max&quot;</code>{" "}
      serwuje nieaktualną treść podczas regeneracji; by odczytać własny zapis w
      Server Action, użyj zamiast tego <code>updateTag</code>.
    </li>
    <li>
      <strong>Tylko miejsca wywołania po stronie serwera.</strong>{" "}
      <code>revalidateTag</code> działa w Server Functions i Route Handlerach,
      nie w Client Components ani Proxy. A akcja unieważniająca prawdziwe dane
      musi sama autoryzować wywołującego; akcja z dema jest publiczna tylko
      dlatego, że dotyka wpisu demonstracyjnego.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym jest ISR i jak go zrobić z Cache Components?",
    answer: (
      <p>
        To serwowanie prerenderowanego wyniku i regenerowanie go w tle. Z Cache
        Components cache&apos;ujesz dane lub komponent przez{" "}
        <code>&quot;use cache&quot;</code> i ustawiasz czas życia przez{" "}
        <code>cacheLife</code> (<code>stale</code>, <code>revalidate</code>,{" "}
        <code>expire</code>), zamiast <code>export const revalidate</code>.
      </p>
    ),
  },
  {
    question: "Co stale-while-revalidate oznacza dla użytkownika?",
    answer: (
      <p>
        Po interwale revalidate następny odwiedzający nadal dostaje natychmiast
        wynik z cache (stary), podczas gdy regeneracja trwa w tle; kolejny
        dostaje świeży. Nikt nie czeka na przebudowę, dopóki nie minie{" "}
        <code>expire</code>.
      </p>
    ),
  },
  {
    question: "revalidateTag, revalidatePath, updateTag: kiedy którego użyć?",
    answer: (
      <p>
        <code>revalidateTag</code> unieważnia wszystkie dane z danym tagiem, na
        wielu stronach; <code>revalidatePath</code> unieważnia konkretną stronę
        lub layout. Oba oznaczają dane jako nieaktualne (użyj{" "}
        <code>&quot;max&quot;</code> dla stale-while-revalidate).{" "}
        <code>updateTag</code> jest dla Server Actions, które muszą od razu
        pokazać nową wartość (read-your-own-writes).
      </p>
    ),
  },
  {
    question: "Dlaczego export const revalidate nie działa w tym projekcie?",
    answer: (
      <p>
        Konfiguracja segmentu trasy, taka jak <code>revalidate</code> i{" "}
        <code>dynamic</code>, jest odrzucana, gdy <code>cacheComponents</code>{" "}
        jest włączone. Cache&apos;owanie wyraża się per funkcja lub komponent
        przez <code>&quot;use cache&quot;</code> i <code>cacheLife</code>.
      </p>
    ),
  },
  {
    question: "Jak krótki czas życia cache wpływa na prerendering?",
    answer: (
      <p>
        <code>revalidate</code> równe 0, <code>expire</code> poniżej pięciu minut
        albo <code>stale</code> poniżej 30 sekund trzyma wynik poza statyczną
        powłoką: staje się dynamiczną dziurą rozwiązywaną w czasie żądania, więc
        potrzebuje granicy Suspense.
      </p>
    ),
  },
  {
    question: "Gdzie można wywołać revalidateTag?",
    answer: (
      <p>
        W Server Functions (Server Actions) i Route Handlerach. Nie można go
        wywołać z Client Components ani z Proxy.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Incremental Static Regeneration",
  summary: "Rewalidacja prerenderowanego wyniku w czasie i na żądanie.",
  basics,
  edgeCases,
  interviewQuestions,
};
