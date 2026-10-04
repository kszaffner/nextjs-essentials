import { listDirectory } from "./readSourceFile";
import styles from "./UnderTheHood.module.css";

type DirectoryTreeProps = {
  // Project-relative folder to list, for example "src/app/[lang]/x/demo".
  root: string;
  // What an entry is for, keyed by its path relative to the root.
  notes?: Readonly<Record<string, string>>;
};

export async function DirectoryTree({ root, notes = {} }: DirectoryTreeProps) {
  const entries = await listDirectory(root);
  const rootName = root.split("/").at(-1) ?? root;

  return (
    <pre className={styles.tree}>
      <code>
        {rootName}/{"\n"}
        {entries.map((entry) => {
          const name = entry.relativePath.split("/").at(-1);
          const note = notes[entry.relativePath];
          return (
            <span key={entry.relativePath}>
              {"  ".repeat(entry.depth + 1)}
              {name}
              {entry.isDirectory ? "/" : ""}
              {note ? <span className={styles.treeNote}>{`   ← ${note}`}</span> : null}
              {"\n"}
            </span>
          );
        })}
      </code>
    </pre>
  );
}
