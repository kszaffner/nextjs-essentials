import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/metadata/og-images/demo";

export const basics = (
  <>
    <p>
      Plik <code>opengraph-image.tsx</code> w segmencie trasy generuje obraz
      pokazywany przy udostępnianiu strony, a Next.js sam podłącza tagi{" "}
      <code>og:image</code> i <code>twitter:image</code>. Zwraca{" "}
      <code>ImageResponse</code> (z <code>next/og</code>) zbudowany z JSX:
    </p>
    <CodeBlock code={`export const alt = "O firmie Acme";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;
  return new ImageResponse(<div style={{ display: "flex" }}>{slug}</div>, size);
}`} />
    <p>
      Ta witryna ma ogólnowitrynowy <code>src/app/opengraph-image.tsx</code>, a{" "}
      <LocalizedLink href={demoHref}>demo</LocalizedLink> dodaje osobny dla
      każdego sluga. Zaobserwowane na buildzie produkcyjnym: plik to prawdziwy
      PNG 1200×630 (odczytane z nagłówka), około 40 KB; head strony głównej ma{" "}
      <code>og:image</code> wskazujące na obraz ogólnowitrynowy, a head strony
      demo wskazuje na jej własny, z <code>og:image:width</code>,{" "}
      <code>height</code>, <code>type</code> i <code>alt</code> oraz
      odpowiadającymi tagami <code>twitter:*</code>.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Wygrywa najbliższy plik; nie kumulują się.</strong> Własny{" "}
      <code>opengraph-image</code> segmentu zastąpił ogólnowitrynowy: head strony
      demo niósł jeden URL obrazu, nie dwa.
    </li>
    <li>
      <strong>Tylko flexbox i podzbiór CSS.</strong> Obraz renderuje Satori, a
      nie przeglądarka: <code>display: grid</code> nie działa, a każdy kontener z
      wieloma dziećmi potrzebuje <code>display: flex</code>. Używaj stylów
      inline.
    </li>
    <li>
      <strong>Limit 500 KB paczki.</strong> JSX, CSS, fonty i obrazy używane
      przez obraz łącznie muszą zmieścić się w 500 KB. Fonty muszą być{" "}
      <code>ttf</code>, <code>otf</code> lub <code>woff</code> (nie{" "}
      <code>woff2</code>), a wbudowany font obejmuje tylko tekst łaciński.
    </li>
    <li>
      <strong>URL-e potrzebują bazy i cache bustera.</strong> Zawartość tagu to
      bezwzględny URL (z <code>metadataBase</code>) z hashem w query, takim jak{" "}
      <code>?b71dcc3d044fcc1b</code>, więc zmieniony obraz dostaje nowy URL, a
      platformy społecznościowe pobierają go ponownie. Sama odpowiedź to{" "}
      <code>public, max-age=0, must-revalidate</code>.
    </li>
    <li>
      <strong>Generowane w buildzie, gdy się da.</strong> Bez API czasu żądania
      obrazy są prerenderowane i cache&apos;owane (<code>○</code> dla
      ogólnowitrynowego, <code>●</code> dla tych per slug). Czytanie{" "}
      <code>params</code> bez <code>generateStaticParams</code> uczyniłoby je
      obrazami czasu żądania.
    </li>
    <li>
      <strong>Platformy cache&apos;ują mocno i mają limity.</strong> Podglądy
      udostępnień cache&apos;uje platforma, nie ty, i mają limity rozmiaru (8 MB
      dla Open Graph, 5 MB dla obrazów Twittera). Debuguj narzędziem podglądu
      platformy i licz się z opóźnieniem po zmianach.
    </li>
    <li>
      <strong>Zawsze ustaw alt.</strong> Wyeksportuj <code>alt</code>, by{" "}
      <code>og:image:alt</code> i <code>twitter:image:alt</code> były wypełnione;
      opisuje obraz osobom, które go nie widzą.
    </li>
    <li>
      <strong>Nieznane parametry powinny dać 404.</strong> Obraz per slug
      wywołuje <code>notFound()</code> dla nieistniejącego sluga, zamiast
      generować kartę dla niczego.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak wygenerować obraz Open Graph w Next.js?",
    answer: (
      <p>
        Dodaj <code>opengraph-image.tsx</code> do segmentu, który domyślnie
        eksportuje funkcję zwracającą <code>new ImageResponse(&lt;JSX /&gt;, size)</code>{" "}
        i eksportuje <code>alt</code>, <code>size</code> oraz{" "}
        <code>contentType</code>. Next.js sam dodaje tagi meta.
      </p>
    ),
  },
  {
    question: "Jakie są ograniczenia ImageResponse?",
    answer: (
      <p>
        Używa Satori: flexbox i podzbiór CSS (bez grid), łączna paczka 500 KB,
        tylko fonty ttf/otf/woff i domyślnie alfabet łaciński. Złożone układy
        trzeba uprościć albo pobrać zasoby w runtime.
      </p>
    ),
  },
  {
    question: "Którego obrazu użyje zagnieżdżona trasa?",
    answer: (
      <p>
        Najbliższego <code>opengraph-image</code> w drzewie tras. Plik segmentu
        nadpisuje ten wyżej, więc możesz mieć domyślny obraz witryny i obrazy
        per element.
      </p>
    ),
  },
  {
    question: "Czy wygenerowane obrazy są cache'owane?",
    answer: (
      <p>
        Domyślnie są prerenderowane w czasie builda i cache&apos;owane, chyba że
        używają API czasu żądania. Obrazy tras dynamicznych potrzebują{" "}
        <code>generateStaticParams</code>, by były prerenderowane. URL w tagu meta
        niesie hash zawartości, więc zmiany są wychwytywane.
      </p>
    ),
  },
  {
    question: "Dlaczego URL og:image musi być bezwzględny?",
    answer: (
      <p>
        Crawlery pobierają go spoza twojej witryny, więc ścieżka względna jest
        bezużyteczna. <code>metadataBase</code> zamienia ścieżki względne na
        bezwzględne URL-e, dlatego musi być poprawnie ustawione w czasie builda.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Obrazy Open Graph",
  summary: "Generowane obrazy z opengraph-image.tsx.",
  basics,
  edgeCases,
  interviewQuestions,
};
