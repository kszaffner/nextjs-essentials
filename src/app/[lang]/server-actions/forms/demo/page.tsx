import { FormsDemo, getFormsInternals } from "@/modules/forms";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/server-actions/forms/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <FormsDemo locale={locale} />
      <InternalsPanel locale={locale} {...getFormsInternals(locale)} />
    </>
  );
}
