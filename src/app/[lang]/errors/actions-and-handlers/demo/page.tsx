import { ActionsAndHandlersDemo, getHandlingInternals } from "@/modules/actions-and-handlers";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/errors/actions-and-handlers/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <ActionsAndHandlersDemo locale={locale} />
      <InternalsPanel locale={locale} {...getHandlingInternals(locale)} />
    </>
  );
}
