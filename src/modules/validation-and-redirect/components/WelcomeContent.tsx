import type { Locale } from "@/shared/i18n";
import { getSignupText } from "../text";
import { WelcomePanel } from "./WelcomePanel";

type WelcomeContentProps = {
  locale: Locale;
  searchParams: Promise<{ name?: string | string[] }>;
};

const MAX_DISPLAYED_NAME_LENGTH = 30;

export async function WelcomeContent({ locale, searchParams }: WelcomeContentProps) {
  const { name } = await searchParams;
  // Query strings are user input too: take one value, bound its length, and
  // let React escape it on render.
  const displayedName = (Array.isArray(name) ? name[0] : name) ?? getSignupText(locale).welcome.defaultName;

  return <WelcomePanel locale={locale} name={displayedName.slice(0, MAX_DISPLAYED_NAME_LENGTH)} />;
}
