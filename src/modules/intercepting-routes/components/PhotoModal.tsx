"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./Gallery.module.css";

type PhotoModalProps = {
  title: string;
  children: ReactNode;
};

// A module-level callback keeps the ref's identity stable, so React does not
// re-run it (and re-open a dialog that was just closed) on every render.
function openAsModal(dialog: HTMLDialogElement | null) {
  if (dialog && !dialog.open) {
    dialog.showModal();
  }
}

export function PhotoModal({ title, children }: PhotoModalProps) {
  const router = useRouter();

  return (
    <dialog
      className={styles.dialog}
      aria-labelledby="photo-modal-title"
      ref={openAsModal}
      // Fires for the Escape key and for dialog.close(): go back so the
      // URL returns to the gallery and the back button keeps working.
      onClose={() => router.back()}
    >
      <h2 id="photo-modal-title">{title}</h2>
      {children}
      <button
        type="button"
        className={styles.button}
        onClick={(event) => event.currentTarget.closest("dialog")?.close()}
      >
        Close
      </button>
    </dialog>
  );
}
