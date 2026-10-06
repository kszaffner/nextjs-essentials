import { FilesViewer, getSitemapRobotsInternals } from "@/modules/sitemap-robots";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/metadata/sitemap-robots/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <FilesViewer locale={locale} />
      <InternalsPanel locale={locale} {...getSitemapRobotsInternals(locale)} />
    </>
  );
}
