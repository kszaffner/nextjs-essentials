import { DemoDestination } from "@/modules/proxy";
import { readLocale } from "@/shared/i18n";

export default async function Page({ params }: PageProps<"/[lang]/advanced-routing/proxy/demo/variant-b">) {
  const locale = await readLocale(params);

  return <DemoDestination locale={locale} kind="variantB" />;
}
