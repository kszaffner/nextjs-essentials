import { highlight, type LanguageName } from "sugar-high";
import styles from "./CodeBlock.module.css";

type CodeBlockProps = {
  code: string;
  // TypeScript covers TSX/JSX, which is what almost every example here is.
  language?: LanguageName;
  // A file name or a short caption shown above the code.
  title?: string;
};

// A code example that looks like an editor in dark mode, in both color
// schemes. `code` is always a literal written in this repository, never user
// input; the highlighter escapes it and returns tokens wrapped in <span>s.
export function CodeBlock({ code, language = "typescript", title }: CodeBlockProps) {
  const html = highlight(code.trim(), { lang: language });

  return (
    <figure className={styles.block}>
      {title ? <figcaption className={styles.title}>{title}</figcaption> : null}
      {/* Focusable, so a keyboard user can scroll a long line sideways. */}
      <pre className={styles.pre} tabIndex={0}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  );
}
