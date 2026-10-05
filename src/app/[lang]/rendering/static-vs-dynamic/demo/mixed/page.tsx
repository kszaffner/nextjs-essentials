import { MixedExample } from "@/modules/static-vs-dynamic";
import { readLocale } from "@/shared/i18n";

export default async function Page({
  params,
}: PageProps<"/[lang]/rendering/static-vs-dynamic/demo/mixed">) {
  return <MixedExample locale={await readLocale(params)} />;
}
