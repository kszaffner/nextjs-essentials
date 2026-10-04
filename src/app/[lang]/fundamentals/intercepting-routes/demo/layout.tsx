export default function DemoLayout({
  children,
  modal,
}: LayoutProps<"/[lang]/fundamentals/intercepting-routes/demo">) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
