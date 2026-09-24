import styles from "./page.module.css";

const FEATURE_CATEGORIES = [
  "Rendering strategies (SSR, SSG, ISR, PPR)",
  "Server & Client Components",
  "Server Actions",
  "Data fetching & caching",
  "Routing (parallel & intercepting routes)",
  "Streaming & Suspense",
  "Middleware / proxy",
  "Metadata API",
  "Error handling",
  "Image & font optimization",
] as const;

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Next.js Essentials</h1>
      <p className={styles.subtitle}>
        An interview-ready showcase of every major Next.js feature, each
        demonstrated in isolation with its edge cases, built on the latest
        major version of the framework.
      </p>
      <div className={styles.categories}>
        {FEATURE_CATEGORIES.map((category) => (
          <div key={category} className={styles.category}>
            <div className={styles.categoryTitle}>{category}</div>
            <div className={styles.categoryStatus}>Not built yet</div>
          </div>
        ))}
      </div>
    </div>
  );
}
