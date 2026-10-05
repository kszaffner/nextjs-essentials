import { CrashBoundary } from "@/modules/error-boundaries";
import { readLocale } from "@/shared/i18n";

// This layout throws. The error.tsx next to it wraps the page below the
// layout, so it cannot catch this: the parent segment's boundary does.
export default async function Layout({
  children,
  params,
}: LayoutProps<"/[lang]/errors/error-boundaries/demo/layout-crash">) {
  const locale = await readLocale(params);

  return (
    <div>
      <CrashBoundary locale={locale} />
      {children}
    </div>
  );
}
