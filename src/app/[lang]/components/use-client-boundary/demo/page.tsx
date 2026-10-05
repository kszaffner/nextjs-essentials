import { SerializationDemo, getUseClientBoundaryInternals } from "@/modules/use-client-boundary";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/components/use-client-boundary/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <SerializationDemo />
      <InternalsPanel locale={locale} {...getUseClientBoundaryInternals(locale)} />
    </>
  );
}
