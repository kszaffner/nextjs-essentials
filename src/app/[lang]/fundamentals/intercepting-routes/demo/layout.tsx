import { getInterceptingInternals } from "@/modules/intercepting-routes";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function DemoLayout({
  children,
  modal,
  params,
}: LayoutProps<"/[lang]/fundamentals/intercepting-routes/demo">) {
  const locale = await readLocale(params);

  return (
    <div>
      {children}
      {modal}
      <InternalsPanel locale={locale} {...getInterceptingInternals(locale)} />
    </div>
  );
}
