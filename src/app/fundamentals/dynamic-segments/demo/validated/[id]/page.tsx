import { notFound } from "next/navigation";
import {
  ParamsReport,
  isKnownItemId,
  knownItemIds,
} from "@/modules/dynamic-segments";

// dynamicParams = false is rejected when Cache Components is on, so unknown
// values are turned away by validating the param and calling notFound().
export function generateStaticParams() {
  return knownItemIds.map((id) => ({ id }));
}

export default async function Page({
  params,
}: PageProps<"/fundamentals/dynamic-segments/demo/validated/[id]">) {
  const { id } = await params;

  if (!isKnownItemId(id)) {
    notFound();
  }

  return <ParamsReport routePattern="/validated/[id]" params={{ id }} />;
}
