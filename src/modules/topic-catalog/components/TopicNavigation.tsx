import Link from "next/link";
import { Suspense } from "react";
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
                {/* usePathname() is runtime data on routes with dynamic params, so
                    it needs a boundary; the fallback is the same link without
                    the active state. */}
                <Suspense
                  fallback={
                    <Link href={topic.href} className={styles.link}>
                      {topic.title}
                    </Link>
                  }
                >
                  <NavigationLink href={topic.href}>{topic.title}</NavigationLink>
                </Suspense>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
