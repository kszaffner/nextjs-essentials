import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import { resolveInsideSource } from "./sourcePath";

const MAX_EXCERPT_LINES = 60;

export type SourceExcerpt = {
  text: string;
  hiddenLineCount: number;
};

// Read while the page is prerendered, so the code shown is the code that was
// built, and no file access happens per request.
export async function readSourceExcerpt(projectPath: string): Promise<SourceExcerpt> {
  "use cache";
  cacheLife("max");

  const lines = (await readFile(/* turbopackIgnore: true */ resolveInsideSource(projectPath), "utf8")).trimEnd().split("\n");
  return {
    text: lines.slice(0, MAX_EXCERPT_LINES).join("\n"),
    hiddenLineCount: Math.max(0, lines.length - MAX_EXCERPT_LINES),
  };
}

export type DirectoryEntry = {
  // Path relative to the listed root, with "/" separators.
  relativePath: string;
  depth: number;
  isDirectory: boolean;
};

// The real files under a folder, folders before files, so the tree on the page
// can never drift from the project.
export async function listDirectory(projectPath: string): Promise<readonly DirectoryEntry[]> {
  "use cache";
  cacheLife("max");

  const root = resolveInsideSource(projectPath);
  const entries: DirectoryEntry[] = [];

  async function walk(directory: string, depth: number) {
    const children = await readdir(/* turbopackIgnore: true */ directory, { withFileTypes: true });
    children.sort((first, second) => Number(second.isDirectory()) - Number(first.isDirectory()) || first.name.localeCompare(second.name));
    for (const child of children) {
      const childPath = path.join(directory, child.name);
      entries.push({
        relativePath: path.relative(root, childPath).split(path.sep).join("/"),
        depth,
        isDirectory: child.isDirectory(),
      });
      if (child.isDirectory()) {
        await walk(childPath, depth + 1);
      }
    }
  }

  await walk(root, 0);
  return entries;
}
