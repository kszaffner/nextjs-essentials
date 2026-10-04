import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { initialPostMessageState } from "../postMessageState";

vi.mock("server-only", () => ({}));
const refresh = vi.fn();
vi.mock("next/cache", () => ({ refresh: () => refresh() }));

const { postMessage } = await import("./actions");
const { readMessages } = await import("./messageStore");

const SIMULATED_LATENCY_MS = 1000;
const VALID_MESSAGE = "hello world";

function formWith(text: string): FormData {
  const formData = new FormData();
  formData.set("text", text);
  return formData;
}

// The action waits a full second; fake timers let the test skip the wait.
async function run(text: string) {
  const pending = postMessage(initialPostMessageState, formWith(text));
  await vi.advanceTimersByTimeAsync(SIMULATED_LATENCY_MS);
  return pending;
}

beforeEach(() => {
  vi.useFakeTimers();
  refresh.mockClear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("postMessage", () => {
  it("stores a valid message, refreshes, and reports it as posted", async () => {
    const before = readMessages().length;

    const state = await run(VALID_MESSAGE);

    expect(state).toEqual({ status: "posted", text: VALID_MESSAGE });
    expect(readMessages().length).toBe(before + 1);
    expect(readMessages().at(-1)).toBe(VALID_MESSAGE);
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("does not respond before the simulated latency has passed", async () => {
    const pending = postMessage(initialPostMessageState, formWith("slow"));
    let settled = false;
    void pending.then(() => {
      settled = true;
    });

    await vi.advanceTimersByTimeAsync(SIMULATED_LATENCY_MS - 1);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await pending;
    expect(settled).toBe(true);
  });

  it("rejects an empty message without storing it", async () => {
    const before = readMessages().length;

    const state = await run("   ");

    expect(state).toMatchObject({ status: "rejected", reason: "Write between 1 and 60 characters." });
    expect(readMessages().length).toBe(before);
    expect(refresh).not.toHaveBeenCalled();
  });

  it("rejects the word 'fail' as a business rule, case-insensitively", async () => {
    const before = readMessages().length;

    const state = await run("FaIl");

    expect(state).toEqual({ status: "rejected", reason: "The server rejected this message.", text: "FaIl" });
    expect(readMessages().length).toBe(before);
  });
});
