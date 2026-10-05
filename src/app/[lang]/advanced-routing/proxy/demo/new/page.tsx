import { DemoDestination } from "@/modules/proxy";
import { readLocale } from "@/shared/i18n";

export default async function Page({ params }: PageProps<"/[lang]/advanced-routing/proxy/demo/new">) {
  const locale = await readLocale(params);

  return <DemoDestination locale={locale} kind="redirectTarget" />;
}
