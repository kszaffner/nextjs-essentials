import { Suspense, type ReactNode } from "react";
import type { Locale } from "@/shared/i18n";
import { getFetchingStrategiesText } from "../text";
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

function getStrategies(locale: Locale): readonly StrategyEntry[] {
  return [
    { name: "Sequential", element: <SequentialStrategy locale={locale} /> },
    { name: "Promise.all", element: <ParallelStrategy locale={locale} /> },
    { name: "Waterfall", element: <WaterfallStrategy locale={locale} /> },
    { name: "Siblings", element: <SiblingStrategy locale={locale} /> },
    { name: "use()", element: <PromiseStrategy locale={locale} /> },
  ];
}

export function FetchingStrategiesDemo({ locale }: { locale: Locale }) {
  const { running } = getFetchingStrategiesText(locale);

  return (
    <ul className={styles.list}>
      {getStrategies(locale).map(({ name, element }) => (
        <Suspense key={name} fallback={<li className={styles.strategy}>{name}: {running}</li>}>
          {element}
        </Suspense>
      ))}
    </ul>
  );
}
