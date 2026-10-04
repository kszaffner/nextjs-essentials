import { SlowDemo } from "@/modules/file-conventions";
import { readLocale } from "@/shared/i18n";

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/file-conventions/demo/slow">) {
  return <SlowDemo locale={await readLocale(params)} />;
}
