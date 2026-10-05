import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/data/revalidation/demo";

export const basics = (
  <>
    <p>
      Dane w cache zostają, dopóki nie skończy się ich czas życia albo ich nie
      unieważnisz. Unieważnianie na żądanie występuje w dwóch kształtach:{" "}
      <strong>po tagu</strong> (oznacz dane przez <code>cacheTag</code>, wygaś
      je funkcją tagu) lub <strong>po ścieżce</strong> (
      <code>revalidatePath</code>). Demo dodaje wpis do listy w pamięci i
      unieważnia jej zcache&apos;owany widok na cztery różne sposoby.
      Zaobserwowane zachowanie:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Wywołanie</th>
          <th scope="col">Gdzie</th>
          <th scope="col">Zaraz po akcji</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <code>updateTag(tag)</code>
          </th>
          <td>Tylko Server Actions</td>
          <td>Lista od razu pokazuje nowy wpis</td>
        </tr>
        <tr>
          <th scope="row">
            <code>revalidateTag(tag, &quot;max&quot;)</code>
          </th>
          <td>Server Actions i Route Handlery</td>
          <td>
            Nadal widać starą listę, także przy następnej wizycie, gdy się
            regeneruje; późniejsza wizyta pokazuje nowy wpis
          </td>
        </tr>
        <tr>
          <th scope="row">
            <code>revalidatePath(path)</code>
          </th>
          <td>Server Functions i Route Handlery</td>
          <td>Lista od razu pokazuje nowy wpis</td>
        </tr>
        <tr>
          <th scope="row">
            <code>refresh()</code>
          </th>
          <td>Tylko Server Actions</td>
          <td>
            Nic się nie zmienia, nawet po przeładowaniu: odświeża router, nie
            cache
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Wypróbuj je w <LocalizedLink href={demoHref}>demo</LocalizedLink>. Wybieraj
      według zachowania, którego chcesz: <code>updateTag</code>, gdy
      użytkownik musi od razu zobaczyć własną zmianę,{" "}
      <code>revalidateTag</code> z <code>&quot;max&quot;</code>, gdy podanie
      lekko nieaktualnych danych w trakcie odświeżania jest w porządku, oraz{" "}
      <code>revalidatePath</code>, gdy myślisz stronami, a nie danymi.
    </p>
    <CodeBlock title="actions.ts" code={`
"use server";

import { refresh, revalidatePath, revalidateTag, updateTag } from "next/cache";

export async function addWithUpdateTag() {
  addEntry();
  updateTag("entries");              // następny render czeka na świeże dane (tylko Server Actions)
}

export async function addWithRevalidateTag() {
  addEntry();
  revalidateTag("entries", "max");   // stale-while-revalidate
}

export async function addWithRevalidatePath() {
  addEntry();
  revalidatePath("/entries", "page"); // po ścieżce zamiast po tagu
}

export async function addWithRefresh() {
  addEntry();
  refresh();                         // odświeża router, nie unieważnia żadnego cache
}
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>revalidateTag</code> potrzebuje profilu.
      </strong>{" "}
      Forma jednoargumentowa jest przestarzała i działa jak{" "}
      <code>{"{ expire: 0 }"}</code> (następne żądanie czeka na świeże dane).
      Przekaż <code>&quot;max&quot;</code> dla stale-while-revalidate albo użyj{" "}
      <code>updateTag</code> w Server Action.
    </li>
    <li>
      <strong>
        <code>updateTag</code> działa tylko w Server Actions.
      </strong>{" "}
      Wywołanie go w Route Handlerze lub gdziekolwiek indziej rzuca błąd. W
      webhookach i Route Handlerach używaj <code>revalidateTag</code>.
    </li>
    <li>
      <strong>Rewalidacja jest sterowana żądaniami.</strong> Wywołanie{" "}
      <code>revalidateTag</code> tylko oznacza dane jako nieaktualne; strony
      regenerują się, gdy są odwiedzane, a nie wszystkie naraz. Dlatego demo
      potrzebuje więcej niż jednej wizyty, by pokazać nowy wpis.
    </li>
    <li>
      <strong>Ścieżki dynamiczne potrzebują typu.</strong>{" "}
      <code>revalidatePath(&quot;/product/[slug]&quot;)</code> wymaga{" "}
      <code>&quot;page&quot;</code> lub <code>&quot;layout&quot;</code> jako
      drugiego argumentu; ścieżka dosłowna jak <code>/product/1</code> go
      pomija. <code>&quot;layout&quot;</code> unieważnia layout, layouty
      zagnieżdżone i każdą stronę pod nimi.
    </li>
    <li>
      <strong>Route Handlery tylko oznaczają ścieżkę.</strong> Tam{" "}
      <code>revalidatePath</code> nie regeneruje od razu; praca dzieje się przy
      następnej wizycie na tej ścieżce.
    </li>
    <li>
      <strong>Tagi to dokładne ciągi znaków.</strong> Rozróżniają wielkość
      liter, mają co najwyżej 256 znaków, a dłuższy tag nigdy nie jest
      dołączany do danych w cache, więc jego rewalidacja po cichu nic nie
      robi.
    </li>
    <li>
      <strong>Tylko serwer.</strong> Żadnej z tych funkcji nie da się wywołać z
      Client Components ani z Proxy. A akcja, która unieważnia prawdziwe dane,
      musi sama sprawdzić autoryzację; akcje w demo są publiczne tylko dlatego,
      że nie przyjmują danych wejściowych i dotykają listy demo w pamięci.
    </li>
    <li>
      <strong>Magazyn demo to pamięć procesu.</strong> Jest spójny na jednym
      procesie serwera; na platformach serverless każda instancja miałaby własną
      listę.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "revalidateTag czy revalidatePath?",
    answer: (
      <p>
        <code>revalidateTag</code> unieważnia każdy wynik w cache niosący tag,
        na wszystkich stronach, które go używają: najlepszy, gdy myślisz
        danymi. <code>revalidatePath</code> unieważnia konkretną stronę lub
        layout: najlepszy, gdy myślisz trasami. Tagi są dokładniejsze; ścieżki
        prostsze.
      </p>
    ),
  },
  {
    question: "updateTag czy revalidateTag(tag, \"max\")?",
    answer: (
      <p>
        <code>updateTag</code> (tylko Server Actions) wygasza dane, więc
        następne żądanie czeka na świeżą treść: read-your-own-writes.{" "}
        <code>revalidateTag</code> z <code>&quot;max&quot;</code> serwuje
        nieaktualną treść w trakcie regeneracji, co jest szybsze, ale znaczy, że
        użytkownik może krótko zobaczyć stare dane.
      </p>
    ),
  },
  {
    question: "Dlaczego revalidateTag przyjmuje teraz drugi argument?",
    answer: (
      <p>
        Ustala, jak długo nieaktualna treść może być jeszcze serwowana.{" "}
        <code>&quot;max&quot;</code> to stale-while-revalidate do roku,{" "}
        <code>{"{ expire: 0 }"}</code> to nigdy nie serwuj nieaktualnych. Stara
        forma jednoargumentowa jest przestarzała i działa jak ta druga.
      </p>
    ),
  },
  {
    question: "Co robi refresh(), a czego nie robi?",
    answer: (
      <p>
        Wywołany z Server Action odświeża router klienta, więc dane bez cache
        renderują się ponownie. Nie unieważnia żadnego cache: w demo lista z
        cache pozostaje taka sama, nawet po przeładowaniu.
      </p>
    ),
  },
  {
    question: "Skąd można wywołać każdą z funkcji unieważniania?",
    answer: (
      <p>
        <code>updateTag</code> i <code>refresh</code>: tylko Server Actions.{" "}
        <code>revalidateTag</code> i <code>revalidatePath</code>: Server
        Functions i Route Handlery. Żadna z Client Components ani z Proxy.
      </p>
    ),
  },
  {
    question: "Kiedy dane z cache faktycznie się regenerują po revalidateTag?",
    answer: (
      <p>
        Przy późniejszym żądaniu, nie w chwili wywołania. Wywołanie oznacza dane
        jako nieaktualne; następna wizyta wyzwala regenerację (w międzyczasie
        serwując nieaktualne dane przy <code>&quot;max&quot;</code>), a wizyta
        po niej dostaje nowe dane.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Rewalidacja",
  summary: "revalidatePath i revalidateTag.",
  basics,
  edgeCases,
  interviewQuestions,
};
