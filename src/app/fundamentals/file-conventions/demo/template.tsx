import type { ReactNode } from "react";
import { PersistenceProbe } from "@/modules/file-conventions";

export default function DemoTemplate({ children }: { children: ReactNode }) {
  return (
    <div>
      <PersistenceProbe label="template.tsx input (resets on navigation)" />
      {children}
    </div>
  );
}
