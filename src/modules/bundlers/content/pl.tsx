import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/optimization/bundlers/demo";

const basics = (
  <>
    <p>
      Bundler zamienia twoje moduły w pliki, które potrafi uruchomić przeglądarka
      (i serwer). Next.js 16 domyślnie używa <strong>Turbopacka</strong> w{" "}
      <code>dev</code> i <code>build</code>; <strong>Webpack</strong> to opcja
      włączana flagą <code>--webpack</code>. Model myślowy Turbopacka według
      dokumentacji:
    </p>
    <ul>
      <li>
        <strong>Jeden zunifikowany graf</strong> dla środowiska klienta i
        serwera, zamiast osobnych kompilatorów sklejonych razem.
      </li>
      <li>
        <strong>Obliczenia przyrostowe:</strong> praca jest cache&apos;owana aż do
        poziomu funkcji i zapisywana na dysku między uruchomieniami, więc nie jest
        powtarzana.
      </li>
      <li>
        <strong>Leniwe bundlowanie w dev:</strong> bundlowane jest tylko to, o co
        poprosi serwer deweloperski, co skraca start i zużycie pamięci.
      </li>
      <li>
        <strong>Bundlowanie w dev, a nie natywne ESM:</strong> bundluje w
        zoptymalizowany sposób, żeby duże aplikacje nie tonęły w żądaniach
        sieciowych.
      </li>
    </ul>
    <p>
      Ten sam projekt zbudowany oboma sposobami na tej maszynie (po jednym
      uruchomieniu, chyba że zaznaczono inaczej; liczby są orientacyjne, to nie
      benchmark):
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col" />
          <th scope="col">Turbopack</th>
          <th scope="col">Webpack</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            czas <code>next build</code>
          </th>
          <td>16 do 17 s (dwa uruchomienia)</td>
          <td>94 s (późniejsze uruchomienie: 75 s)</td>
        </tr>
        <tr>
          <th scope="row">Pliki JavaScript klienta</th>
          <td>44</td>
          <td>155</td>
        </tr>
        <tr>
          <th scope="row">JavaScript klienta, surowy</th>
          <td>1,37 MB</td>
          <td>1,75 MB</td>
        </tr>
        <tr>
          <th scope="row">JavaScript klienta, gzip</th>
          <td>382 KB</td>
          <td>509 KB</td>
        </tr>
      </tbody>
    </table>
    <p>
      Oba zbudowały się z włączonym Sentry i React Compiler.{" "}
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> pokazuje, który bundler
      zbudował wersję, na którą patrzysz; polecenia do przełączania są na tej
      samej stronie.
    </p>
    <CodeBlock title="package.json" language="json" code={`
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:webpack": "next build --webpack",
    "analyze": "next experimental-analyze"
  }
}
`} />
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Konfiguracja tylko dla Webpacka nie jest honorowana.</strong>{" "}
      Funkcja <code>webpack()</code> w <code>next.config</code>, wtyczki
      webpacka i niektóre starsze funkcje CSS Modules należą do udokumentowanych
      luk. Jeśli od nich zależysz, budujesz z <code>--webpack</code>.
    </li>
    <li>
      <strong>Różni się wynik, nie tylko szybkość.</strong> Oba bundlery
      inaczej dzielą kod (tu 44 kontra 155 plików klienta), inaczej porządkują
      CSS Modules i inaczej drukują liczby: dokumentacja pokazuje{" "}
      <code>line-height: 1.4705882353</code> z Webpacka wobec{" "}
      <code>1.47059</code> z Turbopacka. Porównuj na tym samym bundlerze.
    </li>
    <li>
      <strong>Inne udokumentowane luki:</strong> importy Sass z{" "}
      <code>node_modules</code> zachowują się inaczej, Yarn Plug&apos;n&apos;Play i{" "}
      <code>experimental.urlImports</code> nie są wspierane, a niektóre flagi
      eksperymentalne są niedostępne.
    </li>
    <li>
      <strong>Narzędzia idą za bundlerem.</strong>{" "}
      <code>next experimental-analyze</code> (zobacz temat Web Vitals) działa
      tylko z Turbopackiem, a cache serwera deweloperskiego i Fast Refresh to
      funkcje Turbopacka.
    </li>
    <li>
      <strong>Wiedz, który zbudował aplikację.</strong> Demo czyta{" "}
      <code>process.env.TURBOPACK</code>, które Next.js wstawia w czasie builda.
      Nie jest udokumentowane, więc to ciekawostka, a nie API, na którym buduje
      się funkcje; wiarygodnym źródłem jest log builda.
    </li>
    <li>
      <strong>Przełączenie to flaga, a nie przepisywanie.</strong> To samo źródło
      zbudowane obiema drogami (<code>next build --webpack</code> wobec
      domyślnego), więc porównanie lub powrót do starego są tanie.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym jest Turbopack i dlaczego jest domyślny?",
    answer: (
      <p>
        Bundlerem Next.js napisanym w Ruście. Używa jednego grafu dla wszystkich
        środowisk, cache&apos;uje pracę na poziomie funkcji (zapisywaną na dysku)
        i bundluje leniwie w developmencie, przez co start deva i buildy są dużo
        szybsze. Jest domyślny dla <code>next dev</code> i{" "}
        <code>next build</code>.
      </p>
    ),
  },
  {
    question: "Jak użyć Webpacka i po co?",
    answer: (
      <p>
        Dodaj <code>--webpack</code> do <code>next dev</code> lub{" "}
        <code>next build</code>. Zrobisz to, gdy polegasz na czymś, czego
        Turbopack nie wspiera, na przykład konfiguracji <code>webpack()</code>,
        własnych wtyczkach webpacka albo Yarn PnP.
      </p>
    ),
  },
  {
    question: "Czy wyniki obu bundlerów są wymienne?",
    answer: (
      <p>
        Funkcjonalnie tak, ale nie bajt w bajt: dzielenie na chunki, kolejność
        CSS i generowane liczby się różnią. W tym projekcie build Turbopacka miał
        44 pliki klienta i 382 KB po gzip, a build Webpacka 155 i 509 KB.
      </p>
    ),
  },
  {
    question: "Które narzędzia działają tylko z Turbopackiem?",
    answer: (
      <p>
        Wbudowany analizator bundla, <code>next experimental-analyze</code>.
        Projekty na Webpacku używały zamiast niego{" "}
        <code>@next/bundle-analyzer</code>.
      </p>
    ),
  },
  {
    question: "Jak zdecydować, czy odejść od Webpacka?",
    answer: (
      <p>
        Wypisz, co zależy od konfiguracji specyficznej dla webpacka, zbuduj z
        domyślnym bundlerem i porównaj aplikację oraz wynik. Jeśli nic nie
        opiera się na udokumentowanych lukach, domyślny jest szybszy; jeśli coś
        się opiera, zostań przy <code>--webpack</code>, aż da się to zastąpić.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Turbopack vs Webpack",
  summary: "Model myślowy i kiedy użyć którego.",
  basics,
  edgeCases,
  interviewQuestions,
};
