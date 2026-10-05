import { CompositionDemo, getCompositionInternals } from "@/modules/composition";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/components/composition/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <CompositionDemo locale={locale} />
      <InternalsPanel locale={locale} {...getCompositionInternals(locale)} />
    </>
  );
}
