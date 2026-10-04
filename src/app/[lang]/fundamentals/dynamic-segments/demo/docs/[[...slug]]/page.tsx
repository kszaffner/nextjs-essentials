import { Suspense } from "react";
import { ParamsReport } from "@/modules/dynamic-segments";

export default function Page({
  params,
}: PageProps<"/[lang]/fundamentals/dynamic-segments/demo/docs/[[...slug]]">) {
  return (
    <Suspense fallback={<p>Reading params…</p>}>
      {params.then((resolvedParams) => (
        <ParamsReport routePattern="/docs/[[...slug]]" params={resolvedParams} />
      ))}
    </Suspense>
  );
}
