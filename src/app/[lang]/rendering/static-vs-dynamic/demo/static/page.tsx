import { StaticExample } from "@/modules/static-vs-dynamic";
import { readLocale } from "@/shared/i18n";

export default async function Page({
  params,
}: PageProps<"/[lang]/rendering/static-vs-dynamic/demo/static">) {
  return <StaticExample locale={await readLocale(params)} />;
}
