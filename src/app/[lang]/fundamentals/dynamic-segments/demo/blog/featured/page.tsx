import { ParamsReport, getDynamicSegmentsText } from "@/modules/dynamic-segments";
import { readLocale } from "@/shared/i18n";

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/dynamic-segments/demo/blog/featured">) {
  const locale = await readLocale(params);

  return (
    <ParamsReport
      locale={locale}
      routePattern="/blog/featured"
      params={{ lang: locale }}
      note={getDynamicSegmentsText(locale).notes.featured}
    />
  );
}
