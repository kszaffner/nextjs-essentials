import { connection } from "next/server";
import { getHourlyFacts, getSecondsFacts } from "../server/cachedFacts";
import { PprPart } from "./PprPart";

export function StaticPart() {
  return (
    <PprPart
      title="1. Static"
      hint="Known at build time: part of the static shell."
    >
      2 ** 10 = {2 ** 10}
    </PprPart>
  );
}

export async function HourlyCachedPart() {
  const facts = await getHourlyFacts();

  return (
    <PprPart
      title={'2. Cached for hours ("use cache" + cacheLife("hours"))'}
      hint="Prerendered into the shell: the timestamp is from the build (or the last regeneration), not from your request."
    >
      generated at {facts.generatedAt}
    </PprPart>
  );
}

export async function SecondsCachedPart() {
  const facts = await getSecondsFacts();

  return (
    <PprPart
      title={'3. Cached for seconds ("use cache" + cacheLife("seconds"))'}
      hint="Too short-lived for the shell, so it is a dynamic hole, refreshed about every second."
    >
      generated at {facts.generatedAt}
    </PprPart>
  );
}

export async function RequestTimePart() {
  await connection();

  return (
    <PprPart
      title="4. Request time (connection())"
      hint="Never cached: rendered for every request."
    >
      now {new Date().toISOString()}
    </PprPart>
  );
}
