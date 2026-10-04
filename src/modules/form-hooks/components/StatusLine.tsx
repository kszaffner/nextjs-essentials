import type { PostMessageState } from "../postMessageState";
import styles from "./FormHooks.module.css";

type StatusLineProps = {
  state: PostMessageState;
  isPending: boolean;
};

function describe(state: PostMessageState, isPending: boolean): string {
  if (isPending) {
    return "useActionState: pending";
  }
  switch (state.status) {
    case "idle":
      return "useActionState: idle";
    case "posted":
      return `useActionState: posted "${state.text}"`;
    case "rejected":
      return `useActionState: rejected (${state.reason})`;
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

export function StatusLine({ state, isPending }: StatusLineProps) {
  return (
    <p className={styles.status} role="status">
      {describe(state, isPending)}
    </p>
  );
}
