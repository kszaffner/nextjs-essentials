import { ApiConsole, getRouteHandlersInternals } from "@/modules/route-handlers";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/advanced-routing/route-handlers/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <ApiConsole locale={locale} />
      <InternalsPanel locale={locale} {...getRouteHandlersInternals(locale)} />
    </>
  );
}
