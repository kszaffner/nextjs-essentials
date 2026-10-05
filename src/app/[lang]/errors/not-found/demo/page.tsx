import { NotFoundDemoNavigation, getNotFoundInternals } from "@/modules/not-found";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/errors/not-found/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <NotFoundDemoNavigation locale={locale} />
      <InternalsPanel locale={locale} {...getNotFoundInternals(locale)} />
    </>
  );
}
