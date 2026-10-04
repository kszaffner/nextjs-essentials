import type { Locale } from "@/shared/i18n";
import { messages } from "@/shared/i18n";
import { DirectoryTree } from "./DirectoryTree";
import { ResourceLog } from "./ResourceLog";
import { SourceFiles, type SourceFileReference } from "./SourceFiles";
import { UnderTheHood, UnderTheHoodPart } from "./UnderTheHood";

// Plain data, so a topic module can describe its evidence without importing
// any server-only code (a Client Component such as error.tsx imports the same
// module index, which must stay free of file-system access).
export type InternalsSpec = {
  tree?: { root: string; notes: Readonly<Record<string, string>> };
  requests?: { title: string; description: string; urlIncludes: string; fileExtension?: string };
  files?: readonly SourceFileReference[];
};

type InternalsPanelProps = InternalsSpec & { locale: Locale };

// The collapsed "Under the hood" panel of a demo: the real folder, live
// requests from the browser, and excerpts of the files behind the demo.
export function InternalsPanel({ locale, tree, requests, files }: InternalsPanelProps) {
  const labels = messages[locale].underTheHood;

  return (
    <UnderTheHood locale={locale}>
      {tree ? (
        <UnderTheHoodPart title={labels.treeTitle}>
          <DirectoryTree root={tree.root} notes={tree.notes} />
        </UnderTheHoodPart>
      ) : null}
      {requests ? (
        <UnderTheHoodPart title={requests.title}>
          <p>{requests.description}</p>
          <ResourceLog urlIncludes={requests.urlIncludes} fileExtension={requests.fileExtension} />
        </UnderTheHoodPart>
      ) : null}
      {files ? (
        <UnderTheHoodPart title={labels.filesTitle}>
          <SourceFiles locale={locale} files={files} />
        </UnderTheHoodPart>
      ) : null}
    </UnderTheHood>
  );
}
