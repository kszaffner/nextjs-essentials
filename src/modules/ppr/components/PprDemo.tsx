import { Suspense } from "react";
import { PprPart } from "./PprPart";
import {
  HourlyCachedPart,
  RequestTimePart,
  SecondsCachedPart,
  StaticPart,
} from "./PprParts";
import styles from "./Ppr.module.css";

// One page, four kinds of content. Only parts 3 and 4 need a Suspense
// boundary; parts 1 and 2 are in the static shell.
export function PprDemo() {
  return (
    <ul className={styles.list}>
      <StaticPart />
      <HourlyCachedPart />
      <Suspense fallback={<PprPart title="3. (loading)" hint="Suspense fallback in the shell." />}>
        <SecondsCachedPart />
      </Suspense>
      <Suspense fallback={<PprPart title="4. (loading)" hint="Suspense fallback in the shell." />}>
        <RequestTimePart />
      </Suspense>
    </ul>
  );
}
