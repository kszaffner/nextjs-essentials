import { BundlersDemo, getBundlersInternals } from "@/modules/bundlers";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/optimization/bundlers/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <BundlersDemo locale={locale} />
      <InternalsPanel locale={locale} {...getBundlersInternals(locale)} />
    </>
  );
}
