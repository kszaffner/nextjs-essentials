import path from "node:path";

// Only files of this app's own source can be shown, whatever the caller passes.
export function resolveInsideSource(projectPath: string, projectRoot: string = process.cwd()): string {
  // The paths are validated below and only read while prerendering, so the
  // bundler must not trace the whole project into the server output.
  const sourceRoot = path.join(/* turbopackIgnore: true */ projectRoot, "src");
  const resolved = path.resolve(/* turbopackIgnore: true */ projectRoot, projectPath);
  if (resolved !== sourceRoot && !resolved.startsWith(sourceRoot + path.sep)) {
    throw new Error(`Only files under src/ can be shown, got "${projectPath}".`);
  }
  return resolved;
}
