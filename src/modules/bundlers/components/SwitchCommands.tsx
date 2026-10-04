import styles from "./Bundlers.module.css";

export function SwitchCommands() {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Choosing the bundler</h3>
      <pre className={styles.commands}>{`pnpm dev                          # Turbopack (the default)
pnpm build                        # Turbopack (the default)
pnpm exec next dev --webpack      # opt in to Webpack
pnpm exec next build --webpack    # opt in to Webpack`}</pre>
    </section>
  );
}
