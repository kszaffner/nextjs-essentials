import { DemoHome, getErrorBoundariesInternals } from "@/modules/error-boundaries";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/errors/error-boundaries/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <DemoHome locale={locale} />
      <InternalsPanel locale={locale} {...getErrorBoundariesInternals(locale)} />
    </>
  );
}
