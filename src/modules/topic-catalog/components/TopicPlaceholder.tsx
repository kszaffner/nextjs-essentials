import { getTopic, type TopicHref } from "../topics";
import styles from "./TopicPlaceholder.module.css";

type TopicPlaceholderProps = {
  href: TopicHref;
};

// Stand-in for a topic page until its module lands (see ROADMAP.md).
export function TopicPlaceholder({ href }: TopicPlaceholderProps) {
  const topic = getTopic(href);

  return (
    <article>
      <h1>{topic.title}</h1>
      <p className={styles.summary}>{topic.summary}</p>
      <p className={styles.status}>This topic is planned and not written yet.</p>
    </article>
  );
}
