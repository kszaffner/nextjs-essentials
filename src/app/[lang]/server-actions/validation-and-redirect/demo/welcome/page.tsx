import { Suspense } from "react";
import { WelcomeContent, getSignupLoadingText } from "@/modules/validation-and-redirect";
import { readLocale } from "@/shared/i18n";

// searchParams is runtime data, so reading it needs a Suspense boundary.
export default async function Page({
  params,
  searchParams,
}: PageProps<"/[lang]/server-actions/validation-and-redirect/demo/welcome">) {
  const locale = await readLocale(params);

  return (
    <Suspense fallback={<p>{getSignupLoadingText(locale)}</p>}>
      <WelcomeContent locale={locale} searchParams={searchParams} />
    </Suspense>
  );
}
