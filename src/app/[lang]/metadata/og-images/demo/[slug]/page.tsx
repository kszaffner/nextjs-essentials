import { notFound } from "next/navigation";
import { OgItemView, findOgDemoItem, ogDemoItems } from "@/modules/og-images";

export function generateStaticParams() {
  return ogDemoItems.map((item) => ({ slug: item.slug }));
}

export default async function Page({
  params,
}: PageProps<"/[lang]/metadata/og-images/demo/[slug]">) {
  const { slug } = await params;
  const item = findOgDemoItem(slug);

  if (!item) {
    notFound();
  }

  return <OgItemView title={item.title} />;
}
