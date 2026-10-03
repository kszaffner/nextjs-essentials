import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Slots.module.css";

type SlotsFrameProps = {
  children: ReactNode;
  team: ReactNode;
  analytics: ReactNode;
};

const demoBase = "/fundamentals/parallel-routes/demo";

// The layout receives each slot as a prop and decides where it renders.
export function SlotsFrame({ children, team, analytics }: SlotsFrameProps) {
  return (
    <div>
      <nav aria-label="Parallel routes demo">
        <ul className={styles.links}>
          <li>
            <Link href={demoBase}>/demo</Link>
          </li>
          <li>
            <Link href={`${demoBase}/settings`}>/demo/settings (soft navigation)</Link>
          </li>
          <li>
            <a href={`${demoBase}/settings`}>/demo/settings (full page load)</a>
          </li>
        </ul>
      </nav>
      <div className={styles.frame}>
        {children}
        {team}
        {analytics}
      </div>
    </div>
  );
}
