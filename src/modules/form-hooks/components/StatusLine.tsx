import type { Locale } from "@/shared/i18n";
import type { PostMessageState } from "../postMessageState";
import { getFormHooksText } from "../text";
import styles from "./FormHooks.module.css";

type StatusLineProps = {
  locale: Locale;
  state: PostMessageState;
  isPending: boolean;
};

function describe(locale: Locale, state: PostMessageState, isPending: boolean): string {
  const text = getFormHooksText(locale);

  if (isPending) {
    return text.status.pending;
  }
  switch (state.status) {
    case "idle":
      return text.status.idle;
    case "posted":
      return text.status.posted(state.text);
    case "rejected":
      return text.status.rejected(text.rejections[state.reason]);
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

export function StatusLine({ locale, state, isPending }: StatusLineProps) {
  return (
    <p className={styles.status} role="status">
      {describe(locale, state, isPending)}
    </p>
  );
}
