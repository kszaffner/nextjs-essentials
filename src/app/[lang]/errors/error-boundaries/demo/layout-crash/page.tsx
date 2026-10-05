import { DemoHome } from "@/modules/error-boundaries";
import { readLocale } from "@/shared/i18n";

export default async function Page({ params }: PageProps<"/[lang]/errors/error-boundaries/demo/layout-crash">) {
  return <DemoHome locale={await readLocale(params)} />;
}
