import { StaticVsDynamicDemoLinks, getStaticVsDynamicInternals } from "@/modules/static-vs-dynamic";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({
  params,
}: PageProps<"/[lang]/rendering/static-vs-dynamic/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <StaticVsDynamicDemoLinks locale={locale} />
      <InternalsPanel locale={locale} {...getStaticVsDynamicInternals(locale)} />
    </>
  );
}
