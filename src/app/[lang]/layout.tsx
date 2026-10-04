import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TopicNavigation } from "@/modules/topic-catalog";
import { WebVitalsCollector } from "@/modules/web-vitals";
import {
  LanguageSwitcher,
  LocaleProvider,
  LocalizedLink,
  isLocale,
  locales,
  messages,
} from "@/shared/i18n";
import { SiteShell } from "@/shared/layout";
import { getSiteUrl } from "@/shared/site";
import "@/shared/styles/index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Every language is prerendered, so each page stays static.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }
  return {
    // Relative URLs in metadata (canonical, Open Graph images) resolve against this.
    metadataBase: getSiteUrl(),
    title: {
      template: "%s | nextjs-essentials",
      default: messages[lang].siteTitle,
    },
    description: messages[lang].siteDescription,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LocaleProvider locale={lang}>
          <WebVitalsCollector />
          <SiteShell
            header={
              <>
                <LocalizedLink href="/">nextjs-essentials</LocalizedLink>
                {/* usePathname() is runtime data under dynamic params, so the
                    switcher needs a boundary. */}
                <Suspense>
                  <LanguageSwitcher label={messages[lang].languageSwitcher} />
                </Suspense>
              </>
            }
            sidebar={<TopicNavigation locale={lang} />}
          >
            {children}
          </SiteShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
