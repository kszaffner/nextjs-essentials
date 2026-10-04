import { ErrorDemoNavigation } from "@/modules/error-boundaries";

export default function DemoLayout({
  children,
}: LayoutProps<"/[lang]/errors/error-boundaries/demo">) {
  return (
    <div>
      <ErrorDemoNavigation />
      {children}
    </div>
  );
}
