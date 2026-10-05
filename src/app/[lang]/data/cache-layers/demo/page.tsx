import { CacheLayersDemo, getCacheLayersInternals } from "@/modules/cache-layers";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/data/cache-layers/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <CacheLayersDemo locale={locale} />
      <InternalsPanel locale={locale} {...getCacheLayersInternals(locale)} />
    </>
  );
}
