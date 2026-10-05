import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getPprText } from "../text";
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
export function PprDemo({ locale }: { locale: Locale }) {
  const { loading } = getPprText(locale);

  return (
    <ul className={styles.list}>
      <StaticPart locale={locale} />
      <HourlyCachedPart locale={locale} />
      <Suspense fallback={<PprPart title={loading.three} hint={loading.hint} />}>
        <SecondsCachedPart locale={locale} />
      </Suspense>
      <Suspense fallback={<PprPart title={loading.four} hint={loading.hint} />}>
        <RequestTimePart locale={locale} />
      </Suspense>
    </ul>
  );
}
