import { PropInspector } from "./PropInspector";

// Everything below is serializable, so it crosses the boundary as data.
// Functions, class instances, and event handlers would fail the build.
export function SerializationDemo() {
  const values = {
      string: "hello",
      number: 42,
      bigint: BigInt("12345678901234567890"),
      boolean: true,
      nothing: undefined,
      empty: null,
      date: new Date("2026-01-01T00:00:00Z"),
      map: new Map([["key", 1]]),
      set: new Set([1, 2, 3]),
      array: [1, "two", { three: 3 }],
      plainObject: { nested: { deep: true } },
  };

  return <PropInspector sentKeys={Object.keys(values)} values={values} />;
}
