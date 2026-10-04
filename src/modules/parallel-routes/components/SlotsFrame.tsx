import type { ReactNode } from "react";
import styles from "./Slots.module.css";
import { LocalizedAnchor, LocalizedLink } from "@/shared/i18n";

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
            <LocalizedLink href={demoBase}>/demo</LocalizedLink>
          </li>
          <li>
            <LocalizedLink href={`${demoBase}/settings`}>/demo/settings (soft navigation)</LocalizedLink>
          </li>
          <li>
            <LocalizedAnchor href={`${demoBase}/settings`}>/demo/settings (full page load)</LocalizedAnchor>
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
