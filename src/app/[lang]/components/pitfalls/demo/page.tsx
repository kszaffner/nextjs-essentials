import { PitfallsDemo, getPitfallsInternals } from "@/modules/component-pitfalls";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/components/pitfalls/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <PitfallsDemo locale={locale} />
      <InternalsPanel locale={locale} {...getPitfallsInternals(locale)} />
    </>
  );
}
