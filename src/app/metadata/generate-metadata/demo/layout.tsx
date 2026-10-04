import type { Metadata } from "next";
import { MetadataDemoNavigation } from "@/modules/generate-metadata";

// Static metadata for every route below: a title template and Open Graph
// defaults. A page that defines `openGraph` itself replaces this object whole.
export const metadata: Metadata = {
  title: { template: "%s · generateMetadata demo", default: "generateMetadata demo" },
  openGraph: { siteName: "nextjs-essentials", type: "article" },
};

export default function DemoLayout({
  children,
}: LayoutProps<"/metadata/generate-metadata/demo">) {
  return (
    <div>
      <MetadataDemoNavigation />
      {children}
    </div>
  );
}
