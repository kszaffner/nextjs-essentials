import { FetchingStrategiesDemo, getFetchingStrategiesInternals } from "@/modules/parallel-vs-sequential";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/data/parallel-vs-sequential/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <FetchingStrategiesDemo locale={locale} />
      <InternalsPanel locale={locale} {...getFetchingStrategiesInternals(locale)} />
    </>
  );
}
