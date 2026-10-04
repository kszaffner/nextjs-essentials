"use client";

import { useReportWebVitals } from "next/web-vitals";
import { recordVital } from "../vitalsStore";

// Rendered once by the root layout. recordVital is a module-level function, so
// its reference never changes (a changing callback would report duplicates),
// and the client boundary is just this component, not the layout.
export function WebVitalsCollector() {
  useReportWebVitals(recordVital);
  return null;
}
