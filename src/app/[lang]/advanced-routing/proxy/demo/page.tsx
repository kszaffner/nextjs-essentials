import { ProxyDemo, getProxyInternals } from "@/modules/proxy";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/advanced-routing/proxy/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <ProxyDemo locale={locale} />
      <InternalsPanel locale={locale} {...getProxyInternals(locale)} />
    </>
  );
}
