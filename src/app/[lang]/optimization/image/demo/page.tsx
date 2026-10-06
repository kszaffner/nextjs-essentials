import { ImageDemo, getImageInternals } from "@/modules/image";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/optimization/image/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <ImageDemo locale={locale} />
      <InternalsPanel locale={locale} {...getImageInternals(locale)} />
    </>
  );
}
