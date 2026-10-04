"use client";

import { BoundaryFallback, type BoundaryFallbackProps } from "@/modules/error-boundaries";

export default function Error(props: BoundaryFallbackProps) {
  return <BoundaryFallback boundary="demo/error.tsx (the parent boundary)" {...props} />;
}
