import { ErrorDemoNavigation } from "@/modules/error-boundaries";

export default function DemoLayout({
  children,
}: LayoutProps<"/errors/error-boundaries/demo">) {
  return (
    <div>
      <ErrorDemoNavigation />
      {children}
    </div>
  );
}
