import { CodeBlock } from "@/shared/code-block";
import type { Locale } from "@/shared/i18n";
import { getBundlersText } from "../text";
import styles from "./Bundlers.module.css";

export function SwitchCommands({ locale }: { locale: Locale }) {
  const text = getBundlersText(locale).commands;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.hint}>{text.turbopack}</p>
      <CodeBlock title="terminal" code={`pnpm dev
pnpm build`} />
      <p className={styles.hint}>{text.webpack}</p>
      <CodeBlock title="terminal" code={`pnpm exec next dev --webpack
pnpm exec next build --webpack`} />
    </section>
  );
}
