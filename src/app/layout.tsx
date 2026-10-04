import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { TopicNavigation } from "@/modules/topic-catalog";
import { SiteShell } from "@/shared/layout";
import { getSiteUrl } from "@/shared/site";
import { WebVitalsCollector } from "@/modules/web-vitals";
import "@/shared/styles/index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Relative URLs in metadata (canonical, Open Graph images) resolve against this.
  metadataBase: getSiteUrl(),
  title: {
    template: "%s | nextjs-essentials",
    default: "nextjs-essentials",
  },
  description: "An interview-ready compendium of the Next.js App Router.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <WebVitalsCollector />
        <SiteShell
          header={<Link href="/">nextjs-essentials</Link>}
          sidebar={<TopicNavigation />}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
