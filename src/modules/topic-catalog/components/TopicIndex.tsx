import Link from "next/link";
import { topicGroups } from "../topics";
import styles from "./TopicIndex.module.css";

export function TopicIndex() {
  return (
    <div>
      <h1 className={styles.title}>nextjs-essentials</h1>
      <p className={styles.lead}>
        An interview-ready compendium of the Next.js App Router. Every topic
        has Basics, Edge cases, and Interview questions.
      </p>
      {topicGroups.map((group) => (
        <section key={group.title} className={styles.group}>
          <h2 className={styles.groupTitle}>{group.title}</h2>
          <ul className={styles.list}>
            {group.topics.map((topic) => (
              <li key={topic.href} className={styles.card}>
                <Link href={topic.href} className={styles.cardLink}>
                  {topic.title}
                </Link>
                <p className={styles.summary}>{topic.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
