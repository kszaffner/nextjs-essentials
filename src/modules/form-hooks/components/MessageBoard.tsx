"use client";

import { useActionState, useOptimistic } from "react";
import { initialPostMessageState } from "../postMessageState";
import { postMessage } from "../server/actions";
import { StatusLine } from "./StatusLine";
import { SubmitButton } from "./SubmitButton";
import styles from "./FormHooks.module.css";

type MessageBoardProps = {
  messages: readonly string[];
};

type DisplayedMessage = {
  text: string;
  isSending: boolean;
};

export function MessageBoard({ messages }: MessageBoardProps) {
  const [state, formAction, isPending] = useActionState(
    postMessage,
    initialPostMessageState,
  );
  // The optimistic list is `messages` plus whatever is being sent. It snaps
  // back to `messages` as soon as the action settles.
  const [displayedMessages, addOptimisticMessage] = useOptimistic<
    DisplayedMessage[],
    string
  >(
    messages.map((text) => ({ text, isSending: false })),
    (current, text) => [...current, { text, isSending: true }],
  );

  function submit(formData: FormData) {
    addOptimisticMessage(String(formData.get("text") ?? ""));
    formAction(formData);
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Message board</h3>
      <ul className={styles.list}>
        {displayedMessages.map((message, index) => (
          // Messages can repeat, so the position is part of the key.
          <li key={`${message.text}-${index}`} className={message.isSending ? styles.sending : undefined}>
            {message.text}
            {message.isSending ? " (sending…)" : ""}
          </li>
        ))}
      </ul>
      <form action={submit}>
        <label className={styles.field}>
          Message (type &quot;fail&quot; to see a rollback)
          <input
            className={styles.input}
            type="text"
            name="text"
            required
            maxLength={60}
            autoComplete="off"
          />
        </label>
        <SubmitButton />
      </form>
      <StatusLine state={state} isPending={isPending} />
    </section>
  );
}
