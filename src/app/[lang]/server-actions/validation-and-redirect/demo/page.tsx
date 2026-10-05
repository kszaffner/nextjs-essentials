import { InternalsPanel } from "@/shared/under-the-hood";
import { SignupForm, getSignupInternals } from "@/modules/validation-and-redirect";
import { readLocale } from "@/shared/i18n";

export default async function Page({ params }: PageProps<"/[lang]/server-actions/validation-and-redirect/demo">) {
  const locale = await readLocale(params);

  return (
    <>
      <SignupForm locale={locale} />
      <InternalsPanel locale={locale} {...getSignupInternals(locale)} />
    </>
  );
}
