import { notFound } from "next/navigation";
import { OgItemView, findOgDemoItem, getOgImagesInternals, ogDemoItems } from "@/modules/og-images";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export function generateStaticParams() {
  return ogDemoItems.map((item) => ({ slug: item.slug }));
}

export default async function Page({
  params,
}: PageProps<"/[lang]/metadata/og-images/demo/[slug]">) {
  const { slug } = await params;
  const locale = await readLocale(params);
  const item = findOgDemoItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <OgItemView locale={locale} title={item.title} />
      <InternalsPanel locale={locale} {...getOgImagesInternals(locale)} />
    </>
  );
}
