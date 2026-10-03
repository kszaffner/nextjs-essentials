import { Suspense, type ReactNode } from "react";
import { ParallelStrategy } from "./ParallelStrategy";
import { PromiseStrategy } from "./PromiseStrategy";
import { SequentialStrategy } from "./SequentialStrategy";
import { SiblingStrategy } from "./SiblingStrategy";
import { WaterfallStrategy } from "./WaterfallStrategy";
import styles from "./Strategies.module.css";

type StrategyEntry = {
  name: string;
  element: ReactNode;
};

const strategies: readonly StrategyEntry[] = [
  { name: "Sequential", element: <SequentialStrategy /> },
  { name: "Promise.all", element: <ParallelStrategy /> },
  { name: "Waterfall", element: <WaterfallStrategy /> },
  { name: "Siblings", element: <SiblingStrategy /> },
  { name: "use()", element: <PromiseStrategy /> },
];

export function FetchingStrategiesDemo() {
  return (
    <ul className={styles.list}>
      {strategies.map(({ name, element }) => (
        <Suspense key={name} fallback={<li className={styles.strategy}>{name}: running…</li>}>
          {element}
        </Suspense>
      ))}
    </ul>
  );
}
