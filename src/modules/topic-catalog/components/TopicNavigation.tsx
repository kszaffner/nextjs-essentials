import { topicGroups } from "../topics";
import { NavigationLink } from "./NavigationLink";
import styles from "./TopicNavigation.module.css";

export function TopicNavigation() {
  return (
    <nav aria-label="Topics">
      {topicGroups.map((group) => (
        <section key={group.title} className={styles.group}>
          <h2 className={styles.groupTitle}>{group.title}</h2>
          <ul className={styles.list}>
            {group.topics.map((topic) => (
              <li key={topic.href}>
                <NavigationLink href={topic.href}>{topic.title}</NavigationLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
