import { TestingComponentsDemo, getTestingComponentsInternals } from "@/modules/testing-components";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/testing/server-vs-client/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <TestingComponentsDemo locale={locale} />
      <InternalsPanel locale={locale} {...getTestingComponentsInternals(locale)} />
    </>
  );
}
