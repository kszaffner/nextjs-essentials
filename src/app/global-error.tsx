"use client";

import { useEffect } from "react";
import { reportUnexpectedError } from "@/shared/monitoring";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// Replaces the root layout when an error reaches the top, so it must render
// its own <html> and <body>. The app's global styles are not loaded here, and
// neither is the locale provider, so the message is shown in both languages.
export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    reportUnexpectedError(error, { operation: "global-error" });
  }, [error]);

  return (
    <html lang="pl">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Coś poszło nie tak / Something went wrong</h1>
        <p lang="pl">Nie udało się wyświetlić strony. Możesz spróbować ponownie.</p>
        <p lang="en">The page could not be displayed. You can try again.</p>
        {error.digest ? <p>Reference: {error.digest}</p> : null}
        <button type="button" onClick={() => retry()}>
          Spróbuj ponownie / Try again
        </button>
      </body>
    </html>
  );
}
