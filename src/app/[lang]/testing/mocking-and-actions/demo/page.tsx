import { TestedUnitsTable, getTestingActionsInternals } from "@/modules/testing-actions";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/testing/mocking-and-actions/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <TestedUnitsTable locale={locale} />
      <InternalsPanel locale={locale} {...getTestingActionsInternals(locale)} />
    </>
  );
}
