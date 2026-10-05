import type { Locale } from "@/shared/i18n";
import { AllClientCard } from "./AllClientCard";
import { ClientLeafCard } from "./ClientLeafCard";
import styles from "./Pitfalls.module.css";

export function PitfallsDemo({ locale }: { locale: Locale }) {
  return (
    <div className={styles.grid}>
      <ClientLeafCard locale={locale} />
      <AllClientCard />
    </div>
  );
}
