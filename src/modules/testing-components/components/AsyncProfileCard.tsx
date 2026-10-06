import type { Locale } from "@/shared/i18n";
import type { LoadProfile } from "../profile";
import { getTestingComponentsText } from "../text";
import styles from "./Testing.module.css";

type AsyncProfileCardProps = {
  locale: Locale;
  profileId: string;
  loadProfile: LoadProfile;
};

// An async Server Component. The data source is a prop, so the component can
// be tested by calling it as a function with a fake loader.
export async function AsyncProfileCard({ locale, profileId, loadProfile }: AsyncProfileCardProps) {
  const text = getTestingComponentsText(locale).profile;
  const profile = await loadProfile(profileId);

  if (!profile) {
    return (
      <section className={styles.panel}>
        <p className={styles.kind}>{text.kindMissing}</p>
        <p role="alert">{text.noProfile(profileId)}</p>
      </section>
    );
  }

  return (
    <section className={styles.panel}>
      <p className={styles.kind}>{text.kindLoaded}</p>
      <h3 className={styles.title}>{profile.name}</h3>
      <p className={styles.hint}>{profile.role}</p>
    </section>
  );
}
