import { SlotsFrame } from "@/modules/parallel-routes";

export default function DemoLayout({
  children,
  team,
  analytics,
}: LayoutProps<"/fundamentals/parallel-routes/demo">) {
  return (
    <SlotsFrame team={team} analytics={analytics}>
      {children}
    </SlotsFrame>
  );
}
