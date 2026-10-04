import type { LoadProfile } from "../profile";
import styles from "./Testing.module.css";

type AsyncProfileCardProps = {
  profileId: string;
  loadProfile: LoadProfile;
};

// An async Server Component. The data source is a prop, so the component can
// be tested by calling it as a function with a fake loader.
export async function AsyncProfileCard({ profileId, loadProfile }: AsyncProfileCardProps) {
  const profile = await loadProfile(profileId);

  if (!profile) {
    return (
      <section className={styles.panel}>
        <p className={styles.kind}>async Server Component</p>
        <p role="alert">No profile with id {profileId}.</p>
      </section>
    );
  }

  return (
    <section className={styles.panel}>
      <p className={styles.kind}>async Server Component (awaits its data)</p>
      <h3 className={styles.title}>{profile.name}</h3>
      <p className={styles.hint}>{profile.role}</p>
    </section>
  );
}
