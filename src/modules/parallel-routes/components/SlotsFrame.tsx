import type { ReactNode } from "react";
import { LocalizedAnchor, LocalizedLink, type Locale } from "@/shared/i18n";
import { getParallelRoutesText } from "../text";
import styles from "./Slots.module.css";

type SlotsFrameProps = {
  locale: Locale;
  children: ReactNode;
  team: ReactNode;
  analytics: ReactNode;
  // Rendered under the slots; the route file passes the "Under the hood" panel.
  footer?: ReactNode;
};

const demoBase = "/fundamentals/parallel-routes/demo";

// The layout receives each slot as a prop and decides where it renders.
export function SlotsFrame({ locale, children, team, analytics, footer }: SlotsFrameProps) {
  const text = getParallelRoutesText(locale);

  return (
    <div>
      <nav aria-label={text.navigationLabel}>
        <ul className={styles.links}>
          <li>
            <LocalizedLink href={demoBase}>{text.links.home}</LocalizedLink>
          </li>
          <li>
            <LocalizedLink href={`${demoBase}/settings`}>{text.links.soft}</LocalizedLink>
          </li>
          <li>
            <LocalizedAnchor href={`${demoBase}/settings`}>{text.links.hard}</LocalizedAnchor>
          </li>
        </ul>
      </nav>
      <div className={styles.frame}>
        {children}
        {team}
        {analytics}
      </div>
      {footer}
    </div>
  );
}
