import { Suspense } from "react";
import { ParamsReport } from "@/modules/dynamic-segments";

// No generateStaticParams, so the params are runtime data under Cache
// Components: reading them must sit inside a Suspense boundary.
export default function Page({
  params,
}: PageProps<"/[lang]/fundamentals/dynamic-segments/demo/shop/[...slug]">) {
  return (
    <Suspense fallback={<p>Reading params…</p>}>
      {params.then((resolvedParams) => (
        <ParamsReport routePattern="/shop/[...slug]" params={resolvedParams} />
      ))}
    </Suspense>
  );
}
