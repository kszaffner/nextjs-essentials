import type { Metadata } from "next";
import { MetadataDemoNavigation, getGenerateMetadataInternals } from "@/modules/generate-metadata";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

// Static metadata for every route below: a title template and Open Graph
// defaults. A page that defines `openGraph` itself replaces this object whole.
export const metadata: Metadata = {
  title: { template: "%s · generateMetadata demo", default: "generateMetadata demo" },
  openGraph: { siteName: "nextjs-essentials", type: "article" },
};

export default async function DemoLayout({
  children,
  params,
}: LayoutProps<"/[lang]/metadata/generate-metadata/demo">) {
  const locale = await readLocale(params);

  return (
    <div>
      <MetadataDemoNavigation locale={locale} />
      {children}
      <InternalsPanel locale={locale} {...getGenerateMetadataInternals(locale)} />
    </div>
  );
}
