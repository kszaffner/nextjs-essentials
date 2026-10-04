"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Testing.module.css";

type FavouriteButtonProps = {
  // Where the second button goes. A prop, so the component does not need to
  // know the app's routes and a test can assert any destination.
  destination: string;
};

// A Client Component: state, an event handler, and the App Router's
// useRouter. A test needs a DOM, user events, and a stand-in for the router.
export function FavouriteButton({ destination }: FavouriteButtonProps) {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <section className={styles.panel}>
      <p className={styles.kind}>client component (state + useRouter)</p>
      <button
        type="button"
        className={styles.button}
        aria-pressed={isFavourite}
        onClick={() => setIsFavourite((wasFavourite) => !wasFavourite)}
      >
        {isFavourite ? "Remove from favourites" : "Add to favourites"}
      </button>
      <button type="button" className={styles.button} onClick={() => router.push(destination)}>
        Go to the topic page
      </button>
    </section>
  );
}
