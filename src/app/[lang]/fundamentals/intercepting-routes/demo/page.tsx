import { Gallery } from "@/modules/intercepting-routes";
import { readLocale } from "@/shared/i18n";

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/intercepting-routes/demo">) {
  return <Gallery locale={await readLocale(params)} />;
}
