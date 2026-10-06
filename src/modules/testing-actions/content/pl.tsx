import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/testing/mocking-and-actions/demo";

export const basics = (
  <>
    <p>
      Server Action to funkcja async przyjmująca <code>FormData</code> (i może
      poprzedni stan), więc test jednostkowy może ją po prostu wywołać. Praca
      leży w funkcjach frameworka, które wywołuje, a one istnieją tylko wewnątrz
      działającego żądania Next.js. W zwykłym procesie Vitest zachowują się tak
      (sprawdzone w jednorazowym projekcie testowym):
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Wywołanie w teście jednostkowym</th>
          <th scope="col">Co się dzieje</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>redirect(&quot;/somewhere&quot;)</code>
          </td>
          <td>
            Rzuca <code>NEXT_REDIRECT</code> z digestem w rodzaju{" "}
            <code>NEXT_REDIRECT;replace;/somewhere;307;</code>: sprawdź go
          </td>
        </tr>
        <tr>
          <td>
            <code>revalidatePath(&quot;/x&quot;)</code>
          </td>
          <td>
            Rzuca <em>&quot;static generation store missing&quot;</em>: zamockuj{" "}
            <code>next/cache</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>cookies()</code>, <code>connection()</code>
          </td>
          <td>
            Rzucają <em>&quot;called outside a request scope&quot;</em>:
            zamockuj je
          </td>
        </tr>
        <tr>
          <td>
            <code>cacheLife()</code>
          </td>
          <td>
            Rzuca <em>&quot;only available with the `cacheComponents`
            config&quot;</em>: zamockuj <code>next/cache</code>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Przepis więc brzmi: zastąp <code>server-only</code> stubem, funkcje
      frameworka, których nie chcesz uruchamiać, szpiegami <code>vi.fn()</code>,
      wywołaj funkcję i sprawdź jej zwracaną wartość, rzucony błąd i szpiegów.{" "}
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> mapuje dziesięć
      prawdziwych testów z tego repozytorium na technikę, której każdy używa.
    </p>
    <CodeBlock title="actions.test.ts" code={`
import { expect, it, vi } from "vitest";

// revalidatePath potrzebuje działającego żądania Next.js, więc zamockuj next/cache.
// vi.mock jest wynoszone nad importy, więc szpieg pochodzi z vi.hoisted.
const { revalidatePath } = vi.hoisted(() => ({ revalidatePath: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath }));

it("redirects after a valid submit", async () => {
  const formData = new FormData();
  formData.set("name", "Ada");

  // redirect() rzuca NEXT_REDIRECT: sprawdź jego digest.
  await expect(createUser(formData)).rejects.toMatchObject({
    digest: expect.stringContaining("/welcome"),
  });
  expect(revalidatePath).toHaveBeenCalledWith("/users");
});
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Przekierowanie to wyjątek.</strong> Akcja nigdy nie zwraca przy
      sukcesie; test czeka na <code>rejects</code> i sprawdza w digeście ścieżkę
      i <code>307</code>, zamiast mockować <code>redirect</code> i tracić
      sprawdzenie, że zbudowano właściwy URL.
    </li>
    <li>
      <strong>Mockuj tylko to, co wymaga żądania.</strong> Testy Route Handlera
      używają prawdziwych <code>NextRequest</code> i <code>NextResponse</code> i
      mockują tylko <code>connection()</code>, więc asercje obejmują kody
      statusu, nagłówki i body, które zobaczyłby klient.
    </li>
    <li>
      <strong>Fałszywe timery biją czekanie.</strong> Akcję z sekundowym
      opóźnieniem testuje się przez <code>vi.useFakeTimers()</code> i{" "}
      <code>advanceTimersByTimeAsync</code>, wraz ze sprawdzeniem, że nie
      odpowiedziała milisekundę za wcześnie.
    </li>
    <li>
      <strong>Zastąp fetch globalnie, potem sprawdź wywołanie.</strong>{" "}
      <code>vi.stubGlobal(&quot;fetch&quot;, spy)</code> pozwala testowi
      sprawdzić URL i przekazane opcje cache oraz podać testowanemu kodowi dobre
      i złe odpowiedzi (503, zły kształt). Pamiętaj potem o{" "}
      <code>unstubAllGlobals</code>.
    </li>
    <li>
      <strong>
        Funkcja <code>&quot;use cache&quot;</code> to zwykły kod w teście
        jednostkowym.
      </strong>{" "}
      Poza buildem Next.js dyrektywa nic nie robi, więc nic nie jest
      cache&apos;owane; test sprawdza, że ciało zwraca właściwe dane i że przez
      mocki poprosiło o właściwe <code>cacheTag</code> i <code>cacheLife</code>.
    </li>
    <li>
      <strong>Testy jednostkowe nie udowodnią cache ani rewalidacji.</strong>{" "}
      To, że <code>revalidateTag</code> najpierw serwuje nieaktualne dane albo że
      trasa statyczna jest trafieniem w cache, to zachowanie frameworka.
      Potrzebna jest zbudowana aplikacja: pull requesty w tym projekcie
      zapisują te sprawdzenia przez <code>curl</code> i przeglądarkę na
      buildach produkcyjnych.
    </li>
    <li>
      <strong>Trzymaj logikę poza warstwą trudną do testowania.</strong>{" "}
      Decyzje proxy to czysta funkcja, a schemat testuje się osobno, więc części
      wymagające frameworka pozostają cienkie.
    </li>
    <li>
      <strong>Testuj nieszczęśliwe ścieżki.</strong> Każdy test akcji obejmuje
      dane nieprawidłowe, brakujące, zbyt duże i podmienione, bo Server Action to
      publiczny endpoint.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak przetestować jednostkowo Server Action?",
    answer: (
      <p>
        Wywołaj ją jak funkcję z <code>FormData</code> (i poprzednim stanem, jeśli
        używa <code>useActionState</code>), zastąp <code>server-only</code>{" "}
        stubem, zamockuj wywołania frameworka takie jak <code>next/cache</code> i
        sprawdź zwracaną wartość, rzucony błąd oraz szpiegów.
      </p>
    ),
  },
  {
    question: "Jak sprawdzić, że akcja przekierowuje?",
    answer: (
      <p>
        <code>redirect()</code> rzuca, więc akcja się odrzuca. Sprawdź{" "}
        <code>digest</code> błędu, który koduje cel i status (
        <code>NEXT_REDIRECT;…;/path;307;</code>), zamiast mockować{" "}
        <code>redirect</code> i mu ufać.
      </p>
    ),
  },
  {
    question: "Dlaczego revalidatePath, cookies i cacheLife zawodzą w teście?",
    answer: (
      <p>
        Zależą od działającego żądania Next.js lub konfiguracji builda, których
        zwykły proces testowy nie ma. Zastąp je mockami i sprawdź, jak twój kod ich
        użył.
      </p>
    ),
  },
  {
    question: "Jak testować kod wołający fetch?",
    answer: (
      <p>
        Zastąp globalny <code>fetch</code> szpiegiem zwracającym gotowe obiekty{" "}
        <code>Response</code>, sprawdź URL i opcje, z którymi go wywołano, i
        przetestuj ścieżki błędów (status inny niż OK, odpowiedź niezgodna ze
        schematem).
      </p>
    ),
  },
  {
    question: "Czego test jednostkowy nie powie o Server Actions i cache?",
    answer: (
      <p>
        Niczego, co jest zachowaniem frameworka: stale-while-revalidate,
        trafień w cache, prerenderu, streamingu. Zweryfikuj to na buildzie
        produkcyjnym, testem integracyjnym lub end-to-end.
      </p>
    ),
  },
  {
    question: "Jak nie dopuścić, by te testy stały się związane z implementacją?",
    answer: (
      <p>
        Sprawdzaj obserwowalne wyniki (zwracane wartości, statusy, nagłówki,
        rzucone błędy, to, co widzi użytkownik) i mockuj tylko granicę frameworka.
        Refaktoryzacja zachowująca zachowanie nie powinna ruszać testów.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Mockowanie i Server Actions",
  summary: "Mockowanie fetch i cache oraz testowanie Server Actions.",
  basics,
  edgeCases,
  interviewQuestions,
};
