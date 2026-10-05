import { RevalidationDemo, getRevalidationInternals } from "@/modules/revalidation";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/data/revalidation/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <RevalidationDemo locale={locale} />
      <InternalsPanel locale={locale} {...getRevalidationInternals(locale)} />
    </>
  );
}
