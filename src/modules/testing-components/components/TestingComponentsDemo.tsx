import { loadDemoProfile } from "../profile";
import { AsyncProfileCard } from "./AsyncProfileCard";
import { FavouriteButton } from "./FavouriteButton";
import { GreetingCard } from "./GreetingCard";

// The three kinds of component the topic talks about, side by side. Each has
// its tests next to it in this folder.
export function TestingComponentsDemo() {
  return (
    <div>
      <GreetingCard name="Ada Lovelace" role="Mathematician" />
      <FavouriteButton destination="/testing/server-vs-client" />
      <AsyncProfileCard profileId="grace" loadProfile={loadDemoProfile} />
    </div>
  );
}
