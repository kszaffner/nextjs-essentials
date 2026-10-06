import { OgDemoNavigation, getOgImagesInternals } from "@/modules/og-images";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/metadata/og-images/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <OgDemoNavigation locale={locale} />
      <InternalsPanel locale={locale} {...getOgImagesInternals(locale)} />
    </>
  );
}
