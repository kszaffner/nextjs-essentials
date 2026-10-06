"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocalizedPath, type Locale } from "@/shared/i18n";
import { getTestingComponentsText } from "../text";
import styles from "./Testing.module.css";

type FavouriteButtonProps = {
  locale: Locale;
  // Where the second button goes. A prop, so the component does not need to
  // know the app's routes and a test can assert any destination.
  destination: string;
};

// A Client Component: state, an event handler, and the App Router's
// useRouter. A test needs a DOM, user events, and a stand-in for the router.
export function FavouriteButton({ locale, destination }: FavouriteButtonProps) {
  const text = getTestingComponentsText(locale).favourite;
  const router = useRouter();
  const localize = useLocalizedPath();
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <section className={styles.panel}>
      <p className={styles.kind}>{text.kind}</p>
      <button
        type="button"
        className={styles.button}
        aria-pressed={isFavourite}
        onClick={() => setIsFavourite((wasFavourite) => !wasFavourite)}
      >
        {isFavourite ? text.remove : text.add}
      </button>
      <button type="button" className={styles.button} onClick={() => router.push(localize(destination))}>
        {text.goTo}
      </button>
    </section>
  );
}
