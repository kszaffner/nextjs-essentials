import type { InterviewQuestion } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/server-actions/form-hooks/demo";

export const basics = (
  <>
    <p>
      Three React hooks connect forms to Server Actions:
    </p>
    <ul>
      <li>
        <code>useActionState(action, initialState)</code> returns{" "}
        <code>[state, formAction, isPending]</code>. The action receives the{" "}
        <strong>previous state first</strong>, then the <code>FormData</code>;
        whatever it returns becomes the new state.
      </li>
      <li>
        <code>useFormStatus()</code> (from <code>react-dom</code>) returns{" "}
        <code>{"{ pending }"}</code> for the closest parent form: ideal for a
        reusable submit button.
      </li>
      <li>
        <code>useOptimistic(value, reducer)</code> returns{" "}
        <code>[optimisticValue, addOptimistic]</code>: show the expected result
        immediately and let it settle to the real one when the action ends.
      </li>
    </ul>
    <p>
      In the <LocalizedLink href={demoHref}>demo</LocalizedLink> the action takes one second.
      Measured: 250 ms after submitting, the new message was already listed as
      &quot;sending…&quot;, the button read &quot;Posting…&quot; and was
      disabled, and <code>useActionState</code> reported pending. When it
      finished, the entry became real. Posting the message <code>fail</code>
      showed the optimistic entry and then removed it when the server rejected
      it.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>useFormStatus</code> only sees a parent form.
      </strong>{" "}
      Call it in the component that renders the <code>&lt;form&gt;</code> and
      <code> pending</code> is never true. Extract the button into a child
      (the demo&apos;s <code>SubmitButton</code>).
    </li>
    <li>
      <strong>The action signature changes.</strong> Wrapped in{" "}
      <code>useActionState</code>, an action is{" "}
      <code>(previousState, formData)</code>, not <code>(formData)</code>.
    </li>
    <li>
      <strong>The form resets, even on failure.</strong> After &quot;fail&quot;
      was rejected, the input was empty. Return the submitted values in state
      and refill with <code>defaultValue</code> if retrying matters.
    </li>
    <li>
      <strong>Optimistic state is temporary.</strong> It exists only while the
      action runs and reverts to the real value when it settles, which is also
      the automatic rollback on failure. It is not a place to store data.
    </li>
    <li>
      <strong>Wrapping the action costs progressive enhancement.</strong> To
      add the optimistic update, the demo calls <code>formAction</code> from
      its own function, so the form renders with a throwing{" "}
      <code>javascript:</code> action and needs JavaScript. Use the hooks
      directly on the form when no-JS support matters.
    </li>
    <li>
      <strong>Return expected failures, throw unexpected ones.</strong> The
      demo returns <code>rejected</code> as state, modeled as a discriminated
      union and rendered with an exhaustive <code>switch</code>; a throw would
      go to the nearest error boundary instead.
    </li>
    <li>
      <strong>Actions queue.</strong> Submitting twice quickly runs the second
      action after the first (see the basics topic), so the optimistic list can
      show several &quot;sending…&quot; entries.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "What does useActionState return, and what does the action receive?",
    answer: (
      <p>
        <code>[state, formAction, isPending]</code>. The action is called with
        the previous state and the <code>FormData</code>, and its return value
        becomes the next state.
      </p>
    ),
  },
  {
    question: "Why does useFormStatus return pending: false in my form component?",
    answer: (
      <p>
        It reads the status of a <em>parent</em> form. The component that
        renders the form is not inside it, so move the hook into a child
        component such as the submit button.
      </p>
    ),
  },
  {
    question: "How does useOptimistic roll back a failed update?",
    answer: (
      <p>
        The optimistic value only lasts while the action is pending. When the
        action settles, React renders from the real value again, so an
        entry the server did not accept disappears with no extra code.
      </p>
    ),
  },
  {
    question: "useActionState's isPending or useFormStatus's pending?",
    answer: (
      <p>
        <code>isPending</code> is available where you call{" "}
        <code>useActionState</code>. <code>useFormStatus</code> lets any
        descendant of the form (a shared button, a spinner) read it without
        prop drilling.
      </p>
    ),
  },
  {
    question: "Do these hooks work without JavaScript?",
    answer: (
      <p>
        <code>useActionState</code> with a Server Action passed directly does:
        the validation demo returns errors in the HTML of a no-JS POST. A
        wrapper function you add around the action (for example for an
        optimistic update) does not.
      </p>
    ),
  },
  {
    question: "Should a failed action throw or return?",
    answer: (
      <p>
        Return expected failures (validation, a rejected business rule) as
        state so the form can show them; let unexpected errors throw to an
        error boundary.
      </p>
    ),
  },
];
