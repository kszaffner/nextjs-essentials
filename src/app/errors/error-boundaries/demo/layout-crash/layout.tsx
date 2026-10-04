import type { ReactNode } from "react";
import { CrashBoundary } from "@/modules/error-boundaries";

// This layout throws. The error.tsx next to it wraps the page below the
// layout, so it cannot catch this: the parent segment's boundary does.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <CrashBoundary />
      {children}
    </div>
  );
}
