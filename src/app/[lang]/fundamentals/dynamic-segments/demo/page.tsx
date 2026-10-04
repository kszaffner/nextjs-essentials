import { DemoLinks, getDynamicSegmentsInternals } from "@/modules/dynamic-segments";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/dynamic-segments/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <DemoLinks />
      <InternalsPanel locale={locale} {...getDynamicSegmentsInternals(locale)} />
    </>
  );
}
