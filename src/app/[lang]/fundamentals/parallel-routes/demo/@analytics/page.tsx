import { SlowAnalytics } from "@/modules/parallel-routes";
import { readLocale } from "@/shared/i18n";

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/parallel-routes/demo">) {
  return <SlowAnalytics locale={await readLocale(params)} />;
}
