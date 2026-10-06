import { FontDemo, getFontInternals } from "@/modules/font";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/optimization/font/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <FontDemo locale={locale} />
      <InternalsPanel locale={locale} {...getFontInternals(locale)} />
    </>
  );
}
