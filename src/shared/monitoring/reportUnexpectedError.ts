import * as Sentry from "@sentry/nextjs";

type ErrorContext = {
  // Where it happened, e.g. "route-handler:notes" or "global-error".
  operation: string;
  tags?: Record<string, string>;
};

// Reports an error that nothing handled. Never throws: reporting must not mask
// the original error or break the response the caller is waiting on, so a
// failure to report is logged locally and dropped. Expected failures
// (validation, not found) do not belong here; log those instead.
export function reportUnexpectedError(error: unknown, context: ErrorContext): void {
  try {
    Sentry.captureException(error, {
      tags: { operation: context.operation, ...context.tags },
    });
  } catch (reportingError) {
    console.error("Could not report an unexpected error", reportingError);
  }
}
