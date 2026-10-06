import { LocalizedLink } from "@/shared/i18n";
import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/optimization/web-vitals/demo";

const basics = (
  <>
    <p>
      <strong>Core Web Vitals</strong> mierzą to, co czują użytkownicy: jak
      szybko pojawia się główna treść (<strong>LCP</strong>), jak szybko strona
      odpowiada na interakcję (<strong>INP</strong>) i jak bardzo skacze po
      ekranie (<strong>CLS</strong>). <strong>TTFB</strong> i <strong>FCP</strong>{" "}
      to metryki pomocnicze. Progi Google: LCP jest dobre do 2,5 s i słabe powyżej
      4 s, INP dobre do 200 ms i słabe powyżej 500 ms, CLS dobre do 0,1 i słabe
      powyżej 0,25.
    </p>
    <p>
      Next.js daje ci pomiary przez <code>useReportWebVitals</code> (z{" "}
      <code>next/web-vitals</code>). Potrzebuje <code>&quot;use client&quot;</code>,
      więc użyj malutkiego komponentu, który niczego nie renderuje, i zamontuj go
      w głównym layoucie:
    </p>
    <CodeBlock code={`"use client";
import { useReportWebVitals } from "next/web-vitals";

const report = (metric) => { /* wyślij gdzieś */ };   // stabilna referencja

export function WebVitals() {
  useReportWebVitals(report);
  return null;
}`} />
    <p>
      Ta witryna montuje taki kolektor w głównym layoucie i trzyma ostatnią
      wartość każdej metryki w małym magazynie.{" "}
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> pokazuje je z oceną. Na
      buildzie produkcyjnym zgłoszono i oceniono TTFB (22 ms, dobre).
    </p>
    <p>
      <strong>Analiza bundla.</strong> Żeby zobaczyć, dlaczego JavaScript ma taki
      rozmiar, uruchom <code>pnpm analyze</code> (<code>next experimental-analyze</code>).
      Buduje wizualną mapę, którą można filtrować po trasie, przełączać między
      klientem a serwerem i śledzić w niej łańcuchy importów, także przez granice{" "}
      <code>&quot;use client&quot;</code> i dynamicznych importów. Z{" "}
      <code>--output</code> zapisuje statyczne pliki do{" "}
      <code>.next/diagnostics/analyze</code> zamiast uruchamiać serwer; tutaj
      trwało to 25 s i dało folder o rozmiarze 46 MB, który możesz skopiować i
      porównać po refaktoryzacji.
    </p>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Nie każda metryka istnieje przy załadowaniu.</strong> TTFB i FCP są
      znane wcześnie; LCP jest ostateczne dopiero po pierwszej interakcji lub gdy
      karta zostanie ukryta, a INP potrzebuje interakcji. CLS i INP są zgłaszane
      ponownie, gdy się zmieniają, więc magazyn trzyma tylko najnowszą wartość dla
      każdej nazwy.
    </li>
    <li>
      <strong>Niektórych rzeczy tu nie dało się zmierzyć.</strong> W
      zautomatyzowanej przeglądarce użytej do sprawdzenia tego dema zgłoszono
      tylko TTFB: nie zapisała żadnego pomiaru paint (
      <code>performance.getEntriesByType(&quot;paint&quot;)</code> było puste),
      więc FCP, LCP i INP nigdy się nie pojawiły, nawet po prawdziwych
      kliknięciach. Sprawdź je w zwykłej przeglądarce; sama logika oceniania ma
      testy jednostkowe.
    </li>
    <li>
      <strong>Callback nie może się zmieniać.</strong> Nowe funkcje przekazane do
      hooka są wywoływane z dotychczas zebranymi metrykami, więc funkcja inline
      zgłasza duplikaty. Przekaż funkcję z poziomu modułu, tak jak robi to
      kolektor.
    </li>
    <li>
      <strong>Granica klienta ma być malutka.</strong> Kolektor niczego nie
      renderuje, więc zamontowanie go w layoucie dodaje JavaScript, ale żadnego
      markupu klienta, a layout pozostaje Server Componentem.
    </li>
    <li>
      <strong>Laboratorium i teren się rozjeżdżają.</strong> Lokalne uruchomienie
      na szybkiej maszynie to nie to, co widzą odwiedzający. Zbieraj liczby od
      prawdziwych użytkowników (wysyłaj je przez <code>navigator.sendBeacon</code>{" "}
      do endpointu, który je waliduje) i patrz na percentyle, a nie na jedno
      załadowanie.
    </li>
    <li>
      <strong>Raportowanie coś kosztuje.</strong> Próbkowanie, grupowanie i
      niewysyłanie danych osobowych utrzymują je tanim i bezpiecznym. Endpoint
      beacona to publiczna trasa: waliduj jego wejście jak każde inne.
    </li>
    <li>
      <strong>Rozmiarów nie ma już w wyniku builda.</strong> Od Next.js 16.0{" "}
      <code>next build</code> nie drukuje metryk rozmiaru JavaScriptu. Użyj
      analizatora, który działa tylko z Turbopackiem.
    </li>
    <li>
      <strong>Wcześniejsze tematy to dźwignie.</strong> Hero z preload poprawia
      LCP, dopasowany rozmiarem font zastępczy i zarezerwowane miejsce na obrazy
      chronią CLS, streaming i statyczne powłoki pomagają FCP, a dynamiczne
      importy zmniejszają JS blokujący interakcję (INP).
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym są Core Web Vitals?",
    answer: (
      <p>
        Largest Contentful Paint (ładowanie), Interaction to Next Paint
        (responsywność) i Cumulative Layout Shift (stabilność wizualna), z
        progami 2,5 s, 200 ms i 0,1 dla oceny &quot;dobre&quot;. TTFB i FCP to
        powiązane metryki, które pomagają je diagnozować.
      </p>
    ),
  },
  {
    question: "Jak mierzyć je w aplikacji Next.js?",
    answer: (
      <p>
        <code>useReportWebVitals</code> z <code>next/web-vitals</code>, w małym
        Client Componencie zamontowanym w głównym layoucie, z przekazanym mu
        stabilnym callbackiem, który przekazuje każdą metrykę do twojej analityki.
      </p>
    ),
  },
  {
    question: "Dlaczego niektórych metryk brakuje zaraz po załadowaniu strony?",
    answer: (
      <p>
        Nie są jeszcze ostateczne. LCP ustala się przy pierwszej interakcji lub
        gdy strona zostanie ukryta, a INP potrzebuje interakcji. CLS i INP są
        zgłaszane kilka razy, więc zachowujesz najnowszą wartość.
      </p>
    ),
  },
  {
    question: "Jak sprawdzić, co jest w twoim bundlu JavaScriptu?",
    answer: (
      <p>
        <code>next experimental-analyze</code> (tylko Turbopack) buduje
        interaktywny widok według trasy, klienta lub serwera, z łańcuchem
        importów każdego modułu. Użyj <code>--output</code>, żeby zapisać go na
        dysk i porównać przed zmianą i po niej.
      </p>
    ),
  },
  {
    question: "Które funkcje Next.js poprawiają poszczególne metryki?",
    answer: (
      <p>
        LCP: <code>next/image</code> z <code>preload</code> oraz statyczna lub
        strumieniowana powłoka. CLS: width i height obrazów oraz dopasowany
        rozmiarem fallback z <code>next/font</code>. INP: mniej JavaScriptu po
        stronie klienta (Server Components, <code>next/dynamic</code>).
      </p>
    ),
  },
  {
    question: "Dlaczego liczby z laboratorium mogą wprowadzać w błąd?",
    answer: (
      <p>
        Pojedyncze uruchomienie na szybkiej maszynie i sieci pomija wolne
        urządzenia, zimne cache i skrypty stron trzecich. Metryki ocenia się na
        danych terenowych od prawdziwych użytkowników, podsumowanych percentylami.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Web Vitals",
  summary: "Analiza bundla i Core Web Vitals.",
  basics,
  edgeCases,
  interviewQuestions,
};
