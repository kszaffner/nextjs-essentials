---
name: explore
description: Deep, isolated repository search — finding an existing pattern, convention, or usage across many files — without bloating the main conversation. Use for broad/unclear searches, not small lookups.
context: fork
agent: Explore
---

# Explore

Runs in an isolated forked context using the built-in `Explore` agent,
unlike other skills in this project (`code-review`, `knowledge`, which
run inline and need the developer in the loop).

```text
MAIN CONTEXT
      ↓
Explore subagent (forked, isolated)
      ↓
repository search
      ↓
concise findings returned
      ↓
MAIN CONTEXT
```

## When to use this

- Checking whether a pattern or convention already exists before adding
  a new one
- Finding every place a given function, config key, or convention is
  used across a larger codebase
- Any search broad enough that reading through it inline would bloat the
  conversation with noise the developer doesn't need to see

## When NOT to use this

- A single-file lookup — just read the file or grep directly. In a small
  project most lookups don't need a fork.
- Anything the developer needs to see reasoned through live — exploration
  results come back as a summary, not a transcript.

## What it returns

The subagent must return a **concise summary**: the relevant
files/patterns found, not the raw search process. Do not let exploratory
noise (every file read, every grep miss) leak into the main conversation
— that defeats the purpose of forking.

## Note on `context: fork` vs. a conversation branch

`context: fork` (used here) runs this Skill in an isolated subagent
context that reports back a summary — it does not preserve the
conversation the way a session/conversation branch does. Branching the
conversation itself is a different mechanism entirely. Do not confuse the
two.
