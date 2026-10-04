"use client";

import { BoundaryFallback, type BoundaryFallbackProps } from "@/modules/error-boundaries";

export default function Error(props: BoundaryFallbackProps) {
  return <BoundaryFallback boundary="demo/page-crash/error.tsx (the page's own boundary)" {...props} />;
}
