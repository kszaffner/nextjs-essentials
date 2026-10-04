import { notFound } from "next/navigation";
import {
  ParamsReport,
  isKnownItemId,
  knownItemIds,
} from "@/modules/dynamic-segments";
import { readLocale } from "@/shared/i18n";

// dynamicParams = false is rejected when Cache Components is on, so unknown
// values are turned away by validating the param and calling notFound().
export function generateStaticParams() {
  return knownItemIds.map((id) => ({ id }));
}

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/dynamic-segments/demo/validated/[id]">) {
  const [{ id }, locale] = await Promise.all([params, readLocale(params)]);

  if (!isKnownItemId(id)) {
    notFound();
  }

  return <ParamsReport locale={locale} routePattern="/validated/[id]" params={{ lang: locale, id }} />;
}
