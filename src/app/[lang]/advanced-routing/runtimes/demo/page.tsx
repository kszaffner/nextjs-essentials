import { RuntimesDemo, getRuntimesInternals } from "@/modules/runtimes";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/advanced-routing/runtimes/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <RuntimesDemo locale={locale} />
      <InternalsPanel locale={locale} {...getRuntimesInternals(locale)} />
    </>
  );
}
