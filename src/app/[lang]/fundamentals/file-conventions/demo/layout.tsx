import {
  DemoNavigation,
  PersistenceProbe,
  getFileConventionsInternals,
} from "@/modules/file-conventions";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function DemoLayout({
  children,
  params,
}: LayoutProps<"/[lang]/fundamentals/file-conventions/demo">) {
  const locale = await readLocale(params);

  return (
    <div>
      <PersistenceProbe kind="layout" />
      <DemoNavigation />
      {children}
      <InternalsPanel locale={locale} {...getFileConventionsInternals(locale)} />
    </div>
  );
}
