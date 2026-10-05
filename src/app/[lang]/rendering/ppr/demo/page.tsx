import { PprDemo, getPprInternals } from "@/modules/ppr";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/rendering/ppr/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <PprDemo locale={locale} />
      <InternalsPanel locale={locale} {...getPprInternals(locale)} />
    </>
  );
}
