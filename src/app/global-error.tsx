"use client";

import { useEffect } from "react";
import { reportUnexpectedError } from "@/shared/monitoring";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// Replaces the root layout when an error reaches the top, so it must render
// its own <html> and <body>. The app's global styles are not loaded here.
export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    reportUnexpectedError(error, { operation: "global-error" });
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Something went wrong</h1>
        <p>The page could not be displayed. You can try again.</p>
        {error.digest ? <p>Reference: {error.digest}</p> : null}
        <button type="button" onClick={() => retry()}>
          Try again
        </button>
      </body>
    </html>
  );
}
