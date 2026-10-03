import { DemoNavigation, PersistenceProbe } from "@/modules/file-conventions";

export default function DemoLayout({
  children,
}: LayoutProps<"/fundamentals/file-conventions/demo">) {
  return (
    <div>
      <PersistenceProbe label="layout.tsx input (persists across navigation)" />
      <DemoNavigation />
      {children}
    </div>
  );
}
