import { Suspense } from "react";
import {
  NavigationPlayground,
  ServerClock,
  getNavigationInternals,
  getNavigationText,
} from "@/modules/navigation";
import { readLocale } from "@/shared/i18n";
import { InternalsPanel } from "@/shared/under-the-hood";

// useSearchParams() and per-request rendering are runtime data under Cache
// Components, so each needs its own Suspense boundary.
export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/navigation/demo">) {
  const locale = await readLocale(params);
  const text = getNavigationText(locale);

  return (
    <>
      <Suspense fallback={<p>{text.loadingPlayground}</p>}>
        <NavigationPlayground />
      </Suspense>
      <Suspense fallback={<p>{text.renderingServer}</p>}>
        <ServerClock locale={locale} />
      </Suspense>
      <InternalsPanel locale={locale} {...getNavigationInternals(locale)} />
    </>
  );
}
