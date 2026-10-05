import { StreamingDemo, getStreamingInternals } from "@/modules/streaming";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/rendering/streaming/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <StreamingDemo locale={locale} />
      <InternalsPanel locale={locale} {...getStreamingInternals(locale)} />
    </>
  );
}
