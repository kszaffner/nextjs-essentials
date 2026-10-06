import type { Locale } from "@/shared/i18n";
import { getBundlersText } from "../text";
import styles from "./Bundlers.module.css";

// process.env.TURBOPACK is inlined by Next.js at build time (it appears in
// Next's own define list) but is not documented, so treat it as a curiosity
// for this demo, never as an API to build features on.
export function BuiltWithBadge({ locale }: { locale: Locale }) {
  const text = getBundlersText(locale).badge;
  const bundler = process.env.TURBOPACK ? "Turbopack" : "Webpack";

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.badge} role="status">
        {bundler}
      </p>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
