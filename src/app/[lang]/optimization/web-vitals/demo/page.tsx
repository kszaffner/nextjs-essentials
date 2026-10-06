import { VitalsPanel, getWebVitalsInternals } from "@/modules/web-vitals";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/optimization/web-vitals/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <VitalsPanel />
      <InternalsPanel locale={locale} {...getWebVitalsInternals(locale)} />
    </>
  );
}
