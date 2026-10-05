import type { Locale } from "@/shared/i18n";
import { messages } from "@/shared/i18n";
import { ChunkSearch } from "./ChunkSearch";
import { DirectoryTree } from "./DirectoryTree";
import { ResourceLog } from "./ResourceLog";
import { ResponseHeaders } from "./ResponseHeaders";
import { ResponseStream } from "./ResponseStream";
import { RscPayload } from "./RscPayload";
import { SourceFiles, type SourceFileReference } from "./SourceFiles";
import { UnderTheHood, UnderTheHoodPart } from "./UnderTheHood";

// Plain data, so a topic module can describe its evidence without importing
// any server-only code (a Client Component such as error.tsx imports the same
// module index, which must stay free of file-system access).
export type InternalsSpec = {
  tree?: { root: string; notes: Readonly<Record<string, string>> };
  requests?: { title: string; description: string; urlIncludes: string; fileExtension?: string };
  // Fetches pages and shows chosen response headers (cache and streaming evidence).
  responses?: { title: string; description: string; paths: readonly string[]; headerNames: readonly string[] };
  // Streams a page and times every chunk of its body.
  stream?: { title: string; description: string; path: string };
  // The flight (RSC) payload lines that carry a component's props.
  payload?: { title: string; description: string; path: string; lineIncludes: string };
  // Greps the JavaScript chunks the page loaded for a text (is it shipped to the browser?).
  chunkSearches?: readonly { title: string; description: string; needle: string }[];
  files?: readonly SourceFileReference[];
};

type InternalsPanelProps = InternalsSpec & { locale: Locale };

// The collapsed "Under the hood" panel of a demo: the real folder, live
// requests from the browser, and excerpts of the files behind the demo.
export function InternalsPanel({ locale, tree, requests, responses, stream, payload, chunkSearches, files }: InternalsPanelProps) {
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
      {responses ? (
        <UnderTheHoodPart title={responses.title}>
          <p>{responses.description}</p>
          <ResponseHeaders paths={responses.paths} headerNames={responses.headerNames} />
        </UnderTheHoodPart>
      ) : null}
      {stream ? (
        <UnderTheHoodPart title={stream.title}>
          <p>{stream.description}</p>
          <ResponseStream path={stream.path} />
        </UnderTheHoodPart>
      ) : null}
      {payload ? (
        <UnderTheHoodPart title={payload.title}>
          <p>{payload.description}</p>
          <RscPayload path={payload.path} lineIncludes={payload.lineIncludes} />
        </UnderTheHoodPart>
      ) : null}
      {chunkSearches?.map((search) => (
        <UnderTheHoodPart key={search.needle} title={search.title}>
          <p>{search.description}</p>
          <ChunkSearch needle={search.needle} />
        </UnderTheHoodPart>
      ))}
      {files ? (
        <UnderTheHoodPart title={labels.filesTitle}>
          <SourceFiles locale={locale} files={files} />
        </UnderTheHoodPart>
      ) : null}
    </UnderTheHood>
  );
}
