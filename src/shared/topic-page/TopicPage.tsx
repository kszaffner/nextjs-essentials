import type { ReactNode } from "react";
import styles from "./TopicPage.module.css";

export type InterviewQuestion = {
  question: string;
  answer: ReactNode;
};

type TopicPageProps = {
  title: string;
  summary: string;
  basics: ReactNode;
  edgeCases: ReactNode;
  interviewQuestions: readonly InterviewQuestion[];
};

// Every topic page has the same three sections: Basics, Edge cases, and
// Interview questions.
export function TopicPage({
  title,
  summary,
  basics,
  edgeCases,
  interviewQuestions,
}: TopicPageProps) {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        <p className={styles.summary}>{summary}</p>
      </header>
      <section aria-labelledby="basics" className={styles.section}>
        <h2 id="basics">Basics</h2>
        <div className={styles.content}>{basics}</div>
      </section>
      <section aria-labelledby="edge-cases" className={styles.section}>
        <h2 id="edge-cases">Edge cases</h2>
        <div className={styles.content}>{edgeCases}</div>
      </section>
      <section aria-labelledby="interview-questions" className={styles.section}>
        <h2 id="interview-questions">Interview questions</h2>
        {interviewQuestions.length === 0 ? (
          <p className={styles.content}>No questions yet.</p>
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
