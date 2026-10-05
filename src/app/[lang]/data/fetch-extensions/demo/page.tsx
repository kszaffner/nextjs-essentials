import { FetchExtensionsDemo, getFetchExtensionsInternals } from "@/modules/fetch-extensions";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/data/fetch-extensions/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <FetchExtensionsDemo locale={locale} />
      <InternalsPanel locale={locale} {...getFetchExtensionsInternals(locale)} />
    </>
  );
}
