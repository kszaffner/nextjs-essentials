import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/optimization/image/demo";

const basics = (
  <>
    <p>
      <code>&lt;Image&gt;</code> (z <code>next/image</code>) renderuje{" "}
      <code>&lt;img&gt;</code> i bierze na siebie to, co łatwo zepsuć: zmianę
      rozmiaru, nowoczesne formaty, leniwe ładowanie i rezerwowanie miejsca.
    </p>
    <CodeBlock code={`<Image
  src="/demo/hero.jpg"
  alt="..."
  width={1600} height={900}      // rezerwuje miejsce: brak skoku układu
  sizes="(min-width: 60rem) 40rem, 100vw"   // jak szeroki będzie naprawdę
  preload                         // tylko dla obrazu LCP
/>`} />
    <ul>
      <li>
        Buduje <code>srcset</code> z adresów w rodzaju{" "}
        <code>/_next/image?url=…&amp;w=640&amp;q=75</code>. Przeglądarka wybiera
        jeden na podstawie <code>sizes</code> i gęstości ekranu; Next.js zmienia
        rozmiar i format na żądanie i cache&apos;uje wynik.
      </li>
      <li>
        Obrazy są <strong>domyślnie leniwe</strong> (<code>loading=&quot;lazy&quot;</code>).
        Ten, który jest elementem Largest Contentful Paint, powinien za to
        ładować się wcześnie, z <code>preload</code> (które zastępuje
        przestarzałe <code>priority</code>).
      </li>
      <li>
        <code>fill</code> sprawia, że obraz wypełnia pozycjonowany rodzic, gdy
        nie znasz jego rozmiaru.
      </li>
    </ul>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> ma hero z{" "}
      <code>preload</code>, galerię daleko pod linią zgięcia i obraz z{" "}
      <code>fill</code>. Zaobserwowane na buildzie produkcyjnym:
    </p>
    <ul>
      <li>
        hero ma w head <code>&lt;link rel=&quot;preload&quot; as=&quot;image&quot;&gt;</code>{" "}
        i nie ma <code>loading=&quot;lazy&quot;</code>; obrazy galerii i{" "}
        <code>fill</code> mają <code>loading=&quot;lazy&quot;</code>;
      </li>
      <li>
        oryginalny JPEG 1600×900 ma 121 566 bajtów; kandydat 640 px to{" "}
        <strong>WebP o rozmiarze 5928 bajtów</strong>, a 1080 px to WebP o
        rozmiarze 10 358 bajtów.
      </li>
    </ul>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Format zależy od nagłówka Accept.</strong> To samo żądanie zwróciło{" "}
      <code>image/webp</code> przeglądarce, która go akceptuje, i{" "}
      <code>image/jpeg</code> o rozmiarze 19 041 bajtów tej, która akceptuje
      tylko JPEG, z <code>Vary: Accept</code>. AVIF <em>nie</em> został
      zwrócony na żądanie: domyślnie włączony jest tylko WebP.
    </li>
    <li>
      <strong>Endpoint serwuje tylko to, co skonfigurowałeś.</strong> Szerokość
      999 została odrzucona (<em>&quot;&apos;w&apos; parameter (width) of 999 is
      not allowed&quot;</em>), jakość 50 też (<em>&quot;&apos;q&apos; parameter
      (quality) of 50 is not allowed&quot;</em>, domyślnie dozwolone jest tylko
      75), zdalny URL został odrzucony (<em>&quot;&apos;url&apos; parameter is
      not allowed&quot;</em>), dopóki nie wpiszesz go do{" "}
      <code>remotePatterns</code>, a plik, który nie jest obrazem, dostaje 400.
      Dzięki temu nikt nie użyje twojego serwera jako darmowej skalarki obrazów.
    </li>
    <li>
      <strong>Wyniki są cache&apos;owane przez godziny.</strong> Wariant wrócił z{" "}
      <code>Cache-Control: public, max-age=14400, must-revalidate</code> (cztery
      godziny) i za drugim razem był trafieniem w cache.
    </li>
    <li>
      <strong>
        <code>sizes</code> decyduje, który plik zostanie pobrany.
      </strong>{" "}
      Bez niego przeglądarka zakłada, że obraz ma szerokość viewportu, i może
      pobrać plik znacznie większy, niż trzeba. Z nim zmieniają się kandydaci w{" "}
      <code>srcset</code>: hero (<code>100vw</code> na małych ekranach) wymieniło
      640 px i więcej, a galeria (około jednej trzeciej szerokości) także 256 i
      384 px.
    </li>
    <li>
      <strong>Width i height to nie wyświetlany rozmiar.</strong> To rozmiar
      własny, użyty do policzenia proporcji i zarezerwowania miejsca, żeby strona
      nie podskakiwała. Wyświetlany rozmiar kontrolujesz CSS-em (demo używa{" "}
      <code>width: 100%; height: auto</code>).
    </li>
    <li>
      <strong>Preload powinien dostać tylko jeden obraz.</strong> Wstępnie ładuj
      jedyny obraz, który na pewno jest elementem LCP. Kilka obrazów z preload
      konkuruje ze sobą, a dokumentacja w większości pozostałych przypadków
      zaleca <code>loading=&quot;eager&quot;</code> lub{" "}
      <code>fetchPriority=&quot;high&quot;</code>.
    </li>
    <li>
      <strong>Leniwe ładowanie to decyzja przeglądarki.</strong> Next.js
      kontroluje atrybut; przeglądarki zaczynają pobierać leniwy obraz, zanim
      stanie się widoczny, z marginesem zależnym od przeglądarki i połączenia. W
      zautomatyzowanej przeglądarce użytej do sprawdzenia tego dema obrazy 4600
      px pod linią zgięcia były pobierane od razu, więc oceniaj to w panelu
      Network w DevTools prawdziwej przeglądarki.
    </li>
    <li>
      <strong>
        <code>fill</code> potrzebuje rodzica z rozmiarem i pozycją.
      </strong>{" "}
      Rodzic musi mieć <code>position</code> i wysokość (demo używa proporcji), a
      także wartość <code>sizes</code>, inaczej pobierany jest kandydat na pełną
      szerokość.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Co robi dla ciebie next/image?",
    answer: (
      <p>
        Zmienia rozmiar i format obrazów na żądanie (domyślnie WebP), buduje{" "}
        <code>srcset</code>, żeby przeglądarka pobrała właściwy rozmiar, domyślnie
        ładuje leniwie, a <code>width</code>/<code>height</code> wykorzystuje do
        zarezerwowania miejsca i uniknięcia skoku układu. Wyniki są
        cache&apos;owane.
      </p>
    ),
  },
  {
    question: "Który obraz powinien dostać preload i dlaczego tylko jeden?",
    answer: (
      <p>
        Obraz Largest Contentful Paint, zwykle hero nad linią zgięcia: preload
        dodaje do head <code>&lt;link rel=&quot;preload&quot;&gt;</code>, więc
        pobieranie zaczyna się wcześnie. Kilka obrazów z preload konkuruje ze
        sobą i pogarsza LCP, który próbujesz poprawić.
      </p>
    ),
  },
  {
    question: "Co robi sizes?",
    answer: (
      <p>
        Mówi przeglądarce, jak szeroki będzie obraz przy każdym breakpoincie, więc
        może wybrać właściwego kandydata z <code>srcset</code> przed układem
        strony. Bez tego przeglądarka zakłada pełną szerokość viewportu i może
        pobrać obraz dużo większy, niż zostanie pokazany.
      </p>
    ),
  },
  {
    question: "Po co width i height, skoro rozmiar ustawia CSS?",
    answer: (
      <p>
        Dają przeglądarce proporcje, zanim plik się załaduje, więc rezerwuje
        miejsce i treść nie skacze, gdy obraz się pojawi (Cumulative Layout
        Shift). CSS potem skaluje ramkę.
      </p>
    ),
  },
  {
    question: "Jak użyć obrazów z innej domeny?",
    answer: (
      <p>
        Wpisz hosta do <code>images.remotePatterns</code>. Bez tego endpoint
        optymalizacji odrzuca URL, co chroni twój serwer przed użyciem do
        przetwarzania dowolnych obrazów.
      </p>
    ),
  },
  {
    question: "Skąd pochodzi zoptymalizowany obraz i jak długo jest trzymany?",
    answer: (
      <p>
        Z <code>/_next/image</code>: Next.js czyta oryginał, zmienia rozmiar i
        format zależnie od nagłówka <code>Accept</code> żądania i cache&apos;uje
        wynik (domyślnie cztery godziny, potem rewalidacja).
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "next/image",
  summary: "Leniwe ładowanie, srcset, priorytet i LCP.",
  basics,
  edgeCases,
  interviewQuestions,
};
