import { CacheLayersOtherPage } from "@/modules/cache-layers";
import { readLocale } from "@/shared/i18n";

export default async function Page({ params }: PageProps<"/[lang]/data/cache-layers/demo/other">) {
  const locale = await readLocale(params);

  return <CacheLayersOtherPage locale={locale} />;
}
