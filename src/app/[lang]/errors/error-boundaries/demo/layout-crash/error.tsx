"use client";

import { BoundaryFallback, type BoundaryFallbackProps } from "@/modules/error-boundaries";

export default function Error(props: BoundaryFallbackProps) {
  return <BoundaryFallback boundary="demo/layout-crash/error.tsx (the segment's own boundary)" {...props} />;
}
