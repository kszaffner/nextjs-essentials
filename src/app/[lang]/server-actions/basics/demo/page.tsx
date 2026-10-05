import { ServerActionsDemo, getServerActionsBasicsInternals } from "@/modules/server-actions-basics";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

export default async function Page({ params }: PageProps<"/[lang]/server-actions/basics/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <ServerActionsDemo locale={locale} />
      <InternalsPanel locale={locale} {...getServerActionsBasicsInternals(locale)} />
    </>
  );
}
