import { TopicPage } from "@/shared/topic-page";
import { getTopic, type TopicHref } from "../topics";
import styles from "./TopicPlaceholder.module.css";

type TopicPlaceholderProps = {
  href: TopicHref;
};

const notWrittenYet = (
  <p className={styles.status}>This section is planned and not written yet.</p>
);

// Stand-in for a topic page until its module lands (see ROADMAP.md).
export function TopicPlaceholder({ href }: TopicPlaceholderProps) {
  const topic = getTopic(href);

  return (
    <TopicPage
      title={topic.title}
      summary={topic.summary}
      basics={notWrittenYet}
      edgeCases={notWrittenYet}
      interviewQuestions={[]}
    />
  );
}
