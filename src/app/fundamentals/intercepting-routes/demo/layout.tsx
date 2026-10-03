export default function DemoLayout({
  children,
  modal,
}: LayoutProps<"/fundamentals/intercepting-routes/demo">) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
