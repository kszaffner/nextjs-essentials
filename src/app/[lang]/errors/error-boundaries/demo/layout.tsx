import { ErrorDemoNavigation } from "@/modules/error-boundaries";
import { readLocale } from "@/shared/i18n";

export default async function DemoLayout({
  children,
  params,
}: LayoutProps<"/[lang]/errors/error-boundaries/demo">) {
  const locale = await readLocale(params);

  return (
    <div>
      <ErrorDemoNavigation locale={locale} />
      {children}
    </div>
  );
}
