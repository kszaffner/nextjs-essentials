import { DynamicDemo, getDynamicImportInternals } from "@/modules/dynamic-import";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({
  params,
}: PageProps<"/[lang]/optimization/dynamic-import/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <DynamicDemo />
      <InternalsPanel locale={locale} {...getDynamicImportInternals(locale)} />
    </>
  );
}
