import { SlotsFrame, getParallelRoutesInternals } from "@/modules/parallel-routes";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function DemoLayout({
  children,
  team,
  analytics,
  params,
}: LayoutProps<"/[lang]/fundamentals/parallel-routes/demo">) {
  const locale = await readLocale(params);

  return (
    <SlotsFrame
      locale={locale}
      team={team}
      analytics={analytics}
      footer={<InternalsPanel locale={locale} {...getParallelRoutesInternals(locale)} />}
    >
      {children}
    </SlotsFrame>
  );
}
