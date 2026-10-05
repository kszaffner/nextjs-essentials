import { IsrDemo, getIsrInternals } from "@/modules/isr";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/rendering/isr/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <IsrDemo locale={locale} />
      <InternalsPanel locale={locale} {...getIsrInternals(locale)} />
    </>
  );
}
