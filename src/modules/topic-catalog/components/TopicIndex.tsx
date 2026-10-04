import type { Locale } from "@/shared/i18n";
import { LocalizedLink, messages } from "@/shared/i18n";
import { getTopicGroups } from "../topics";
import styles from "./TopicIndex.module.css";

export function TopicIndex({ locale }: { locale: Locale }) {
  return (
    <div>
      <h1 className={styles.title}>nextjs-essentials</h1>
      <p className={styles.lead}>{messages[locale].indexLead}</p>
      {getTopicGroups(locale).map((group) => (
        <section key={group.id} className={styles.group}>
          <h2 className={styles.groupTitle}>{group.title}</h2>
          <ul className={styles.list}>
            {group.topics.map((topic) => (
              <li key={topic.href} className={styles.card}>
                <LocalizedLink href={topic.href} className={styles.cardLink}>
                  {topic.title}
                </LocalizedLink>
                <p className={styles.summary}>{topic.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
