import { DemoPage } from "@/modules/file-conventions";

export default function Page() {
  return (
    <DemoPage
      title="About (route group)"
      description="This file is demo/(grouped)/about/page.tsx, but the URL has no (grouped) segment."
    />
  );
}
