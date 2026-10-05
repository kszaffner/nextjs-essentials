import { FormHooksDemo, getFormHooksInternals } from "@/modules/form-hooks";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/server-actions/form-hooks/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <FormHooksDemo locale={locale} />
      <InternalsPanel locale={locale} {...getFormHooksInternals(locale)} />
    </>
  );
}
