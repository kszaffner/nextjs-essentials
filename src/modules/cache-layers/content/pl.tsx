import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/data/cache-layers/demo";

export const basics = (
  <>
    <p>
      Next.js cache&apos;uje na czterech warstwach, a większość błędów typu
      „dlaczego to jest nieaktualne?” bierze się z niewiedzy, która z nich cię
      obsługuje. Klasyczne nazwy nadal opisują mechanizmy; przy Cache
      Components część z nich jest zrealizowana inaczej:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Warstwa</th>
          <th scope="col">Gdzie</th>
          <th scope="col">Co robi</th>
          <th scope="col">Z Cache Components</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Request Memoization</th>
          <td>Serwer, jeden render</td>
          <td>
            Wykonuje identyczne fetche <code>GET</code> i wywołania{" "}
            <code>React.cache</code> raz na render
          </td>
          <td>Bez zmian</td>
        </tr>
        <tr>
          <th scope="row">Data Cache</th>
          <td>Serwer, trwały</td>
          <td>Trzyma wyniki między żądaniami i wdrożeniami</td>
          <td>
            <code>&quot;use cache&quot;</code> z <code>cacheLife</code> i{" "}
            <code>cacheTag</code>
          </td>
        </tr>
        <tr>
          <th scope="row">Full Route Cache</th>
          <td>Serwer (lub CDN)</td>
          <td>Przechowuje prerenderowany HTML i payload RSC</td>
          <td>Statyczna powłoka każdej trasy (dynamicznych dziur w niej nie ma)</td>
        </tr>
        <tr>
          <th scope="row">Router Cache</th>
          <td>Klient, w pamięci</td>
          <td>Ponownie używa payloadów RSC, więc nawigacja jest natychmiastowa</td>
          <td>Cache klienta z czasem nieaktualności oraz odwiedzone trasy trzymane przy życiu</td>
        </tr>
      </tbody>
    </table>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> uwidacznia trzy z nich.
      Komponent A i Komponent B proszą o te same dane w jednym renderze i oba
      widzą ten sam przebieg: to memoizacja. Numer przebiegu{" "}
      <code>&quot;use cache&quot;</code> nie rusza się po przeładowaniu: to
      cache serwera. A znacznik czasu strony zmienia się lub trzyma w zależności
      od tego, jak wracasz na stronę: to warstwa klienta.
    </p>
    <p>
      Zaobserwowane na buildzie produkcyjnym: trasa statyczna jest serwowana z{" "}
      <code>Cache-Control: s-maxage=31536000</code> jako trafienie w cache i
      niesie <code>x-nextjs-stale-time: 300</code>, czyli pięciominutowy czas
      życia cache klienta.
    </p>
    <CodeBlock title="layerCounters.ts" code={`
import { cache } from "react";
import { cacheLife } from "next/cache";

// Warstwa 1, memoizacja żądań: ciało wykonuje się raz na render,
// niezależnie od liczby komponentów, które je wołają.
export const loadMemoizedRun = cache(async () => {
  memoizedRuns += 1;
  return { run: memoizedRuns };
});

// Warstwa 2, cache serwera: ciało wykonuje się tylko wtedy, gdy
// nie ma świeżego wyniku w cache, niezależnie od tego, kto pyta.
export async function getCachedRun() {
  "use cache";
  cacheLife("hours");

  cachedRuns += 1;
  return { run: cachedRuns };
}

// Warstwa 3 to Router Cache w przeglądarce:
// router.refresh() renderuje stronę ponownie, nie czyści cache serwera.
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Link renderuje ponownie; przycisk wstecz przywraca.</strong>{" "}
      Przejście pod URL przez <code>Link</code> to nowa nawigacja, a dynamiczna
      treść jest renderowana na serwerze od nowa. <code>router.back()</code>{" "}
      lub przycisk wstecz przeglądarki przywraca stronę, którą opuściłeś, z tym
      samym znacznikiem czasu, bo odwiedzone trasy są zachowywane zamiast
      odmontowywane. Demo pokazuje oba przypadki.
    </li>
    <li>
      <strong>Stan klienta teraz przetrwa nawigację.</strong> Przy Cache
      Components trasy są trzymane w ukrytym stanie zamiast się odmontowywać,
      więc wartości <code>useState</code>, pola formularzy i pozycja przewinięcia
      zostają po powrocie. Kod, który polegał na odmontowaniu, by zresetować
      stan, potrzebuje jawnego resetu.
    </li>
    <li>
      <strong>
        <code>router.refresh()</code> odświeża stronę, nie cache serwera.
      </strong>{" "}
      W demo ponownie uruchamia zmemoizowany loader (nowy przebieg przy każdym
      odświeżeniu), podczas gdy przebieg <code>&quot;use cache&quot;</code>{" "}
      pozostaje ten sam. By zmienić dane w cache, unieważnij je przez{" "}
      <code>revalidateTag</code>, <code>updateTag</code> lub{" "}
      <code>revalidatePath</code>.
    </li>
    <li>
      <strong>Memoizacja jest wąska.</strong> Dotyczy fetchy <code>GET</code> z
      tym samym URL i opcjami oraz <code>React.cache</code>. Działa per render,
      nie w Route Handlerach, a sygnał z <code>AbortController</code> wyłącza z
      niej żądanie. Każda funkcja z cache ma też własny, odizolowany zakres{" "}
      <code>React.cache</code>.
    </li>
    <li>
      <strong>revalidatePath odświeża więcej niż ścieżkę.</strong> Wywołane w
      Server Function natychmiast aktualizuje bieżącą stronę, a obecnie sprawia
      też, że wcześniej odwiedzone strony odświeżają się, gdy do nich ponownie
      przejdziesz.
    </li>
    <li>
      <strong>Czas życia cache klienta zależy od typu trasy.</strong> Trasy
      statyczne są domyślnie cache&apos;owane przez pięć minut; treść dynamiczna
      nie jest cache&apos;owana na kliencie, dopóki tego nie włączysz.
      Prefetching i te czasy to zachowanie produkcyjne, więc testuj przez{" "}
      <code>next build</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Wymień cztery warstwy cache w Next.js i co robi każda.",
    answer: (
      <p>
        Request Memoization deduplikuje identyczne fetche w jednym renderze na
        serwerze. Data Cache trwale przechowuje wyniki między żądaniami. Full
        Route Cache przechowuje prerenderowany HTML i payload RSC. Router Cache
        trzyma payloady RSC w przeglądarce dla natychmiastowej nawigacji.
      </p>
    ),
  },
  {
    question: "Co zastępuje Data Cache i Full Route Cache przy Cache Components?",
    answer: (
      <p>
        <code>&quot;use cache&quot;</code> (z <code>cacheLife</code> i{" "}
        <code>cacheTag</code>) to serwerowy cache danych, a statyczna powłoka
        każdej trasy to to, co przechowywał Full Route Cache. Memoizacja żądań
        jest bez zmian.
      </p>
    ),
  },
  {
    question: "Czym memoizacja żądań różni się od cache danych?",
    answer: (
      <p>
        Memoizacja żyje przez jeden render i tylko deduplikuje identyczne
        wywołania; nic nie przetrwa żądania. Cache danych utrzymuje się między
        żądaniami i jest sterowany czasami życia oraz unieważnianiem.
      </p>
    ),
  },
  {
    question: "Dlaczego Link renderuje stronę ponownie, a przycisk wstecz nie?",
    answer: (
      <p>
        Link rozpoczyna świeżą nawigację, a dynamiczna treść domyślnie nie jest
        cache&apos;owana na kliencie, więc serwer renderuje ją od nowa.
        Wstecz/dalej przywraca trasę, którą Next.js utrzymał przy życiu, więc ten
        sam wyrenderowany wynik wraca bez żądania.
      </p>
    ),
  },
  {
    question: "Jak unieważnić każdą z warstw?",
    answer: (
      <p>
        Dane serwera i prerenderowany wynik: <code>revalidateTag</code>,{" "}
        <code>updateTag</code> lub <code>revalidatePath</code>. Router Cache na
        kliencie: <code>router.refresh()</code> (lub upływ czasu nieaktualności).
        Memoizacja nie wymaga unieważniania: kończy się z renderem.
      </p>
    ),
  },
  {
    question: "Czy router.refresh() czyści cache serwera?",
    answer: (
      <p>
        Nie. Pobiera bieżącą trasę z serwera ponownie i zachowuje stan klienta,
        ale dane z <code>&quot;use cache&quot;</code> są serwowane jak
        wcześniej.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Warstwy cache",
  summary: "Data Cache, Full Route Cache, Router Cache i Request Memoization.",
  basics,
  edgeCases,
  interviewQuestions,
};
