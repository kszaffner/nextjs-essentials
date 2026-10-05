import "server-only";
import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";
import { getCompositionText } from "../text";
import { SERVER_ONLY_MARKER } from "./serverFacts";

// Lives next to the server-only module on purpose: the marker it searches for
// must not appear in any file that a Client Component imports.
export function getCompositionInternals(locale: Locale): InternalsSpec {
  const { internals } = getCompositionText(locale);

  return {
    chunkSearches: [{ title: internals.searchTitle, description: internals.searchHint, needle: SERVER_ONLY_MARKER }],
    files: [
      { path: "src/modules/composition/components/CompositionDemo.tsx", note: internals.files.demo },
      { path: "src/modules/composition/components/Collapsible.tsx", note: internals.files.collapsible },
      { path: "src/modules/composition/server/serverFacts.ts", note: internals.files.serverFacts },
    ],
  };
}
