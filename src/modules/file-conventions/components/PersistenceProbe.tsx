import styles from "./Demo.module.css";

type PersistenceProbeProps = {
  label: string;
};

// An uncontrolled input: whatever the user types lives in the DOM, so it
// survives navigation only if the component around it is not remounted.
export function PersistenceProbe({ label }: PersistenceProbeProps) {
  return (
    <label className={styles.field}>
      {label}
      <input
        className={styles.input}
        type="text"
        placeholder="Type here, then use the links below"
      />
    </label>
  );
}
