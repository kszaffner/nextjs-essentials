#!/bin/bash
# protect-main-branch.sh
# PreToolUse hook — blocks `git commit` and direct `git push` to `main`.
# Forces a feature-branch-plus-PR workflow instead. Adapted from
# kszaffner/nextjs-claude-starter's hook of the same name.
#
# Known limitation (tracked for Phase 14): `git push origin --delete
# <branch>` while sitting on a protected branch is a false positive — it
# deletes a remote branch, not the current one, but the "plain push, no
# refspec" check below can't tell the difference. Workaround until fixed:
# run the delete before switching back to the protected branch.

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Only look at commands that actually invoke `git commit` or `git push`.
if ! echo "$COMMAND" | grep -qE '(^|[;&|]|\s)git\s+(commit|push)\b'; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
CURRENT_BRANCH=$(git -C "$PROJECT_DIR" rev-parse --abbrev-ref HEAD 2>/dev/null)
PROTECTED_BRANCHES=("main" "master")

is_protected() {
  local branch="$1"
  for b in "${PROTECTED_BRANCHES[@]}"; do
    [[ "$branch" == "$b" ]] && return 0
  done
  return 1
}

deny() {
  jq -n --arg reason "$1" \
    '{hookSpecificOutput: {hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: $reason}}'
  exit 0
}

# `git commit` while sitting on a protected branch.
if echo "$COMMAND" | grep -qE '(^|[;&|]|\s)git\s+commit\b'; then
  if is_protected "$CURRENT_BRANCH"; then
    deny "Blocked: committing directly on protected branch '$CURRENT_BRANCH'. Create a feature branch and open a PR instead."
  fi
  exit 0
fi

# `git push` that explicitly targets a protected branch (origin main,
# HEAD:main, :main, etc.) regardless of current branch.
if echo "$COMMAND" | grep -qE '(^|[;&|]|\s)git\s+push\b'; then
  for b in "${PROTECTED_BRANCHES[@]}"; do
    if echo "$COMMAND" | grep -qE "(^|[[:space:]])(origin[[:space:]]+)?${b}([[:space:]]|\$)|:${b}([[:space:]]|\$)|HEAD:${b}"; then
      deny "Blocked: pushing directly to protected branch '$b'. Push a feature branch and open a PR instead."
    fi
  done

  # Plain `git push` (no explicit refspec) while sitting on a protected
  # branch would push that branch directly — block it too.
  if is_protected "$CURRENT_BRANCH" && ! echo "$COMMAND" | grep -qE '[A-Za-z0-9_./-]+:[A-Za-z0-9_./-]+'; then
    deny "Blocked: 'git push' while on protected branch '$CURRENT_BRANCH' would push it directly. Switch to a feature branch first."
  fi
fi

exit 0
