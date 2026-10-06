import type { Locale } from "@/shared/i18n";
import { loadDemoProfile } from "../profile";
import { AsyncProfileCard } from "./AsyncProfileCard";
import { FavouriteButton } from "./FavouriteButton";
import { GreetingCard } from "./GreetingCard";

// The three kinds of component the topic talks about, side by side. Each has
// its tests next to it in this folder.
export function TestingComponentsDemo({ locale }: { locale: Locale }) {
  return (
    <div>
      <GreetingCard locale={locale} name="Ada Lovelace" role="Mathematician" />
      <FavouriteButton locale={locale} destination="/testing/server-vs-client" />
      <AsyncProfileCard locale={locale} profileId="grace" loadProfile={loadDemoProfile} />
    </div>
  );
}
