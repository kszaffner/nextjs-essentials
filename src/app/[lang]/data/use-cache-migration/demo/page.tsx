import { MigrationDemo, getMigrationInternals } from "@/modules/use-cache-migration";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/data/use-cache-migration/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <MigrationDemo locale={locale} />
      <InternalsPanel locale={locale} {...getMigrationInternals(locale)} />
    </>
  );
}
