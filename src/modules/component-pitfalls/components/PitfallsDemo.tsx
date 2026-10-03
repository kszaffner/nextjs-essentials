import { AllClientCard } from "./AllClientCard";
import { ClientLeafCard } from "./ClientLeafCard";
import styles from "./Pitfalls.module.css";

export function PitfallsDemo() {
  return (
    <div className={styles.grid}>
      <ClientLeafCard />
      <AllClientCard />
    </div>
  );
}
