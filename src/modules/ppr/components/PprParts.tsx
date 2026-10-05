import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getHourlyFacts, getSecondsFacts } from "../server/cachedFacts";
import { getPprText } from "../text";
import { PprPart } from "./PprPart";

type PartProps = { locale: Locale };

export function StaticPart({ locale }: PartProps) {
  const text = getPprText(locale).static;

  return (
    <PprPart title={text.title} hint={text.hint}>
      2 ** 10 = {2 ** 10}
    </PprPart>
  );
}

export async function HourlyCachedPart({ locale }: PartProps) {
  const facts = await getHourlyFacts();
  const text = getPprText(locale);

  return (
    <PprPart title={text.hourly.title} hint={text.hourly.hint}>
      {text.generatedAt} {facts.generatedAt}
    </PprPart>
  );
}

export async function SecondsCachedPart({ locale }: PartProps) {
  const facts = await getSecondsFacts();
  const text = getPprText(locale);

  return (
    <PprPart title={text.seconds.title} hint={text.seconds.hint}>
      {text.generatedAt} {facts.generatedAt}
    </PprPart>
  );
}

export async function RequestTimePart({ locale }: PartProps) {
  await connection();
  const text = getPprText(locale);

  return (
    <PprPart title={text.request.title} hint={text.request.hint}>
      {text.now} {new Date().toISOString()}
    </PprPart>
  );
}
