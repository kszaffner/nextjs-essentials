import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/data/use-cache-migration/demo";

export const basics = (
  <>
    <p>
      <code>unstable_cache</code> opakowywał funkcję i przyjmował tablicę
      key-parts oraz obiekt opcji. <code>&quot;use cache&quot;</code> go
      zastępuje: dyrektywa trafia do ciała funkcji, klucz wynika z argumentów,
      a opcje stają się wywołaniami <code>cacheLife</code> i{" "}
      <code>cacheTag</code>.
    </p>
    <pre>
      <code>{`// Przed
export const getUser = unstable_cache(
  async (id: string) => db.users.find(id),
  ["user"],                                  // key parts
  { tags: ["users"], revalidate: 3600 },
);

// Po
export async function getUser(id: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("users");
  return db.users.find(id);
}`}</code>
    </pre>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> wywołuje zmigrowaną
      formę z id <code>1</code>, <code>2</code>, <code>1</code>. Trzy wywołania,
      dwa różne id: ciało wykona się najwyżej dwa razy, a przeładowanie nic nie
      dodaje, bo każde id to osobny wpis w cache.
    </p>
    <p>
      Inne stare API też się zmieniają. Zweryfikowane na wersji Next.js z tego
      projektu:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Dawniej</th>
          <th scope="col">Teraz</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>fetch(url, {"{ cache, next: { revalidate, tags } }"})</code>
          </td>
          <td>
            Fetch wewnątrz funkcji <code>&quot;use cache&quot;</code>;{" "}
            <code>cacheLife</code> i <code>cacheTag</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>export const revalidate</code>
          </td>
          <td>Błąd builda; użyj <code>cacheLife</code></td>
        </tr>
        <tr>
          <td>
            <code>export const dynamic</code> (<code>force-dynamic</code>,{" "}
            <code>force-static</code>)
          </td>
          <td>Błąd builda; usuń</td>
        </tr>
        <tr>
          <td>
            <code>export const fetchCache</code>
          </td>
          <td>Błąd builda; usuń</td>
        </tr>
        <tr>
          <td>
            <code>export const experimental_ppr</code>
          </td>
          <td>Błąd builda; PPR jest domyślne</td>
        </tr>
        <tr>
          <td>
            <code>export const runtime = &quot;edge&quot;</code>
          </td>
          <td>Błąd builda; usuń</td>
        </tr>
        <tr>
          <td>
            <code>export const dynamicParams</code>
          </td>
          <td>Błąd builda; zwaliduj parametr i wywołaj <code>notFound()</code></td>
        </tr>
        <tr>
          <td>
            <code>unstable_noStore()</code>
          </td>
          <td>
            Niepotrzebne; użyj <code>connection()</code> wewnątrz Suspense dla
            pracy w czasie żądania
          </td>
        </tr>
        <tr>
          <td>
            <code>revalidateTag(tag)</code>
          </td>
          <td>
            <code>revalidateTag(tag, &quot;max&quot;)</code> albo{" "}
            <code>updateTag</code> w Server Action
          </td>
        </tr>
        <tr>
          <td>
            <code>React.cache</code>
          </td>
          <td>Zwykle bez zmian</td>
        </tr>
      </tbody>
    </table>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>unstable_cache</code> nadal się buduje.
      </strong>{" "}
      Strona go używająca kompilowała się z włączonymi Cache Components, a
      wynik builda pokazywał nawet jednominutowy revalidate. Migracji nie
      wymusza błąd, więc łatwo ją zostawić na później. Migruj świadomie.
    </li>
    <li>
      <strong>
        <code>unstable_noStore()</code> nie czyni trasy dynamiczną.
      </strong>{" "}
      Strona, która tylko go wywoływała, nadal była prerenderowana jako
      statyczna (○). Nie polegaj na nim przy renderowaniu per żądanie; użyj{" "}
      <code>connection()</code> i <code>&lt;Suspense&gt;</code>.
    </li>
    <li>
      <strong>Konfiguracje segmentu trasy zawodzą głośno.</strong>{" "}
      <code>dynamic</code>, <code>revalidate</code>, <code>fetchCache</code>,{" "}
      <code>experimental_ppr</code>, <code>runtime</code> i{" "}
      <code>dynamicParams</code> każda kończy build błędem{" "}
      <em>
        &quot;Route segment config &quot;…&quot; is not compatible with
        `nextConfig.cacheComponents`. Please remove it.&quot;
      </em>
    </li>
    <li>
      <strong>Kluczem są argumenty, więc trzymaj je małe.</strong> Argumenty i
      wartości przechwycone z otaczającego zakresu stają się częścią klucza
      cache. Przekaż id, a nie duży obiekt, i dane runtime podawaj jako
      argumenty.
    </li>
    <li>
      <strong>Kod w cache nie może czytać danych żądania.</strong> Funkcja{" "}
      <code>&quot;use cache&quot;</code> nie może wywołać <code>cookies()</code>{" "}
      ani <code>headers()</code>; przeczytaj je na zewnątrz i przekaż wartości.
    </li>
    <li>
      <strong>Tag na wpis, gdy potrzebujesz unieważniania per wpis.</strong>{" "}
      Demo taguje każdego użytkownika przez <code>{"`user-${id}`"}</code>;
      jeden wspólny tag unieważnia wszystkie wpisy razem.
    </li>
    <li>
      <strong>Ustaw czas życia.</strong> Bez <code>cacheLife</code> obowiązuje
      domniemany profil <code>default</code> (15 minut do rewalidacji, nigdy
      nie wygasa), który rzadko odpowiada temu, co mówiły opcje{" "}
      <code>unstable_cache</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak zmigrować unstable_cache do use cache?",
    answer: (
      <p>
        Zamień opakowaną funkcję w funkcję z <code>&quot;use cache&quot;</code>{" "}
        w ciele. Porzuć tablicę key-parts (klucz bierze się z argumentów) i
        przemapuj opcje: <code>revalidate</code> staje się <code>cacheLife</code>,{" "}
        <code>tags</code> stają się <code>cacheTag</code>.
      </p>
    ),
  },
  {
    question: "Jak budowany jest klucz cache w use cache?",
    answer: (
      <p>
        Automatycznie, z argumentów funkcji i wartości, które przechwytuje z
        zakresu rodzica. Różne argumenty dają osobne wpisy, co demo pokazuje na
        różnych id użytkowników.
      </p>
    ),
  },
  {
    question: "Co dzieje się z opcjami cache i next w fetch?",
    answer: (
      <p>
        Przenieś fetch do funkcji <code>&quot;use cache&quot;</code>. Jej
        żądania są cache&apos;owane automatycznie, a <code>next.revalidate</code>{" "}
        i <code>next.tags</code> stają się <code>cacheLife</code> i{" "}
        <code>cacheTag</code>.
      </p>
    ),
  },
  {
    question: "Co zrobić z export const dynamic = \"force-dynamic\"?",
    answer: (
      <p>
        Usuń: przy Cache Components to błąd builda. Część działającą w czasie
        żądania umieść za <code>connection()</code> (lub danymi runtime)
        wewnątrz <code>&lt;Suspense&gt;</code>; reszta pozostaje statyczna.
      </p>
    ),
  },
  {
    question: "Co zastępuje unstable_noStore?",
    answer: (
      <p>
        Nic nie jest cache&apos;owane, dopóki nie dodasz{" "}
        <code>&quot;use cache&quot;</code>, więc nie jest potrzebny. Dla pracy,
        która musi działać per żądanie, wywołaj przed nią{" "}
        <code>connection()</code> i opakuj ją w Suspense.
        <code> noStore()</code> samo nie wymusza renderowania dynamicznego.
      </p>
    ),
  },
  {
    question: "Dlaczego funkcja use cache nie może wywołać cookies()?",
    answer: (
      <p>
        Wynik w cache jest współdzielony między żądaniami, więc nie może
        zależeć od danych jednego żądania. Przeczytaj cookie na zewnątrz i
        przekaż to, czego potrzebujesz, jako argument, co też wkłada to do
        klucza cache.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Migracja do use cache",
  summary: 'Przejście z unstable_cache na "use cache".',
  basics,
  edgeCases,
  interviewQuestions,
};
