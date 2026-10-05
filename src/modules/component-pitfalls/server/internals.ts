import "server-only";
import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";
import { getPitfallsText } from "../text";

// The needles are the marker strings printed by the two cards. They are
// repeated here, in a file only the server imports, so that no client chunk
// contains the leaf marker just because the panel searches for it.
export function getPitfallsInternals(locale: Locale): InternalsSpec {
  const { internals } = getPitfallsText(locale);

  return {
    chunkSearches: [
      { title: internals.leafTitle, description: internals.leafHint, needle: "LEAF_PATTERN_SERVER_TEXT_5d1e" },
      { title: internals.allTitle, description: internals.allHint, needle: "ALL_CLIENT_TEXT_91c4" },
    ],
    files: [
      { path: "src/modules/component-pitfalls/components/ClientLeafCard.tsx", note: internals.files.leaf },
      { path: "src/modules/component-pitfalls/components/AllClientCard.tsx", note: internals.files.all },
      { path: "src/modules/component-pitfalls/components/LikeButton.tsx", note: internals.files.button },
    ],
  };
}
