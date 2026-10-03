import styles from "./Streaming.module.css";

type PendingBlockProps = {
  label: string;
};

export function PendingBlock({ label }: PendingBlockProps) {
  return (
    <div className={`${styles.block} ${styles.pending}`}>
      <strong>{label}</strong>
      <p>waiting… (Suspense fallback)</p>
    </div>
  );
}
