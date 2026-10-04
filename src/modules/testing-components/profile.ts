export type Profile = {
  id: string;
  name: string;
  role: string;
};

// Injected into the async Server Component, so a test can hand it any data
// (or a failure) without a network or a database.
export type LoadProfile = (id: string) => Promise<Profile | undefined>;

const profiles: readonly Profile[] = [
  { id: "ada", name: "Ada Lovelace", role: "Mathematician" },
  { id: "grace", name: "Grace Hopper", role: "Rear admiral" },
];

export const loadDemoProfile: LoadProfile = async (id) => {
  return profiles.find((profile) => profile.id === id);
};
