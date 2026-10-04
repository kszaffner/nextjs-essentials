import type { ReactNode } from "react";
import { messages, type Locale } from "@/shared/i18n";
import styles from "./TopicPage.module.css";

export type InterviewQuestion = {
  question: string;
  answer: ReactNode;
};

type TopicPageProps = {
  locale: Locale;
  title: string;
  summary: string;
  basics: ReactNode;
  edgeCases: ReactNode;
  interviewQuestions: readonly InterviewQuestion[];
};

// Every topic page has the same three sections: Basics, Edge cases, and
// Interview questions. The headings come from the locale; the rest is the
// topic's own content.
export function TopicPage({
  locale,
  title,
  summary,
  basics,
  edgeCases,
  interviewQuestions,
}: TopicPageProps) {
  const labels = messages[locale].topicPage;

  return (
    <article>
      <header>
        <h1>{title}</h1>
        <p className={styles.summary}>{summary}</p>
      </header>
      <section aria-labelledby="basics" className={styles.section}>
        <h2 id="basics">{labels.basics}</h2>
        <div className={styles.content}>{basics}</div>
      </section>
      <section aria-labelledby="edge-cases" className={styles.section}>
        <h2 id="edge-cases">{labels.edgeCases}</h2>
        <div className={styles.content}>{edgeCases}</div>
      </section>
      <section aria-labelledby="interview-questions" className={styles.section}>
        <h2 id="interview-questions">{labels.interviewQuestions}</h2>
        {interviewQuestions.length === 0 ? (
          <p className={styles.content}>{labels.noQuestions}</p>
        ) : (
          <ul className={styles.questions}>
            {interviewQuestions.map(({ question, answer }) => (
              <li key={question}>
                <details className={styles.question}>
                  <summary>{question}</summary>
                  <div className={styles.answer}>{answer}</div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
