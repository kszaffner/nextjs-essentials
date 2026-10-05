import { CrashBoundary } from "@/modules/error-boundaries";
import { readLocale } from "@/shared/i18n";

export default async function Page({ params }: PageProps<"/[lang]/errors/error-boundaries/demo/page-crash">) {
  return <CrashBoundary locale={await readLocale(params)} />;
}
