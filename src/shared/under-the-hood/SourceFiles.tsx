import { messages, type Locale } from "@/shared/i18n";
import { readSourceExcerpt } from "./readSourceFile";
import styles from "./UnderTheHood.module.css";

export type SourceFileReference = {
  // Project-relative, for example "src/app/[lang]/fundamentals/x/page.tsx".
  path: string;
  // Why this file matters for the demo, in the page's language.
  note: string;
};

type SourceFilesProps = {
  locale: Locale;
  files: readonly SourceFileReference[];
};

export async function SourceFiles({ locale, files }: SourceFilesProps) {
  const text = messages[locale].underTheHood;
  const excerpts = await Promise.all(files.map((file) => readSourceExcerpt(file.path)));

  return (
    <ul className={styles.fileList}>
      {files.map((file, index) => {
        const excerpt = excerpts[index];
        return (
          <li key={file.path}>
            <details className={styles.file}>
              <summary>
                <code>{file.path}</code>
              </summary>
              <p className={styles.note}>{file.note}</p>
              <pre className={styles.code}>
                <code>{excerpt?.text}</code>
              </pre>
              {excerpt && excerpt.hiddenLineCount > 0 ? (
                <p className={styles.note}>{text.moreLines(excerpt.hiddenLineCount)}</p>
              ) : null}
            </details>
          </li>
        );
      })}
    </ul>
  );
}
