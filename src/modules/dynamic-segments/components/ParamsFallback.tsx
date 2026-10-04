"use client";

import { useDynamicSegmentsText } from "../text";

// The Suspense fallback of the catch-all demos. Those pages cannot read
// their params before the boundary, so the language comes from the context.
export function ParamsFallback() {
  return <p>{useDynamicSegmentsText().readingParams}</p>;
}
