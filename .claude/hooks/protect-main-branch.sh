#!/bin/bash
# protect-main-branch.sh
# PreToolUse hook — blocks `git commit` and direct `git push` to a
# protected branch (main/master). Forces feat/fix/chore/hotfix branches
# + PRs instead. See docs/workflow.md for the branch naming convention
# this enforces.

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
    deny "Blocked: committing directly on protected branch '$CURRENT_BRANCH'. Create a feat/fix/chore/hotfix branch and open a PR instead (see docs/workflow.md)."
  fi
  exit 0
fi

# `git push` that explicitly targets a protected branch (origin main,
# HEAD:main, :main, etc.) regardless of current branch.
if echo "$COMMAND" | grep -qE '(^|[;&|]|\s)git\s+push\b'; then
  for b in "${PROTECTED_BRANCHES[@]}"; do
    if echo "$COMMAND" | grep -qE "(^|[[:space:]])(origin[[:space:]]+)?${b}([[:space:]]|\$)|:${b}([[:space:]]|\$)|HEAD:${b}"; then
      deny "Blocked: pushing directly to protected branch '$b'. Push a feature branch and open a PR instead (see docs/workflow.md)."
    fi
  done

  # Plain `git push` (no explicit refspec) while sitting on a protected
  # branch would push that branch directly — block it too.
  if is_protected "$CURRENT_BRANCH" && ! echo "$COMMAND" | grep -qE '[A-Za-z0-9_./-]+:[A-Za-z0-9_./-]+'; then
    deny "Blocked: 'git push' while on protected branch '$CURRENT_BRANCH' would push it directly. Switch to a feature branch first (see docs/workflow.md)."
  fi
fi

exit 0
