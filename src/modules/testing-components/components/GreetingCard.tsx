import styles from "./Testing.module.css";

type GreetingCardProps = {
  name: string;
  role: string;
};

// A synchronous, hook-free component: it is the same kind of thing whether it
// runs on the server or the client, so a plain render test covers it.
export function GreetingCard({ name, role }: GreetingCardProps) {
  return (
    <section className={styles.panel}>
      <p className={styles.kind}>sync component (no hooks, no async)</p>
      <h3 className={styles.title}>Hello, {name}</h3>
      <p className={styles.hint}>{role}</p>
    </section>
  );
}
