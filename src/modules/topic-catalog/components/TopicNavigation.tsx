import { Suspense } from "react";
import { LocalizedLink, messages, type Locale } from "@/shared/i18n";
import { getTopicGroups } from "../topics";
import { NavigationLink } from "./NavigationLink";
import styles from "./TopicNavigation.module.css";

export function TopicNavigation({ locale }: { locale: Locale }) {
  return (
    <nav aria-label={messages[locale].topicsNavigation}>
      {getTopicGroups(locale).map((group) => (
        <section key={group.id} className={styles.group}>
          <h2 className={styles.groupTitle}>{group.title}</h2>
          <ul className={styles.list}>
            {group.topics.map((topic) => (
              <li key={topic.href}>
                {/* usePathname() is runtime data on routes with dynamic params, so
                    it needs a boundary; the fallback is the same link without
                    the active state. */}
                <Suspense
                  fallback={
                    <LocalizedLink href={topic.href} className={styles.link}>
                      {topic.title}
                    </LocalizedLink>
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
