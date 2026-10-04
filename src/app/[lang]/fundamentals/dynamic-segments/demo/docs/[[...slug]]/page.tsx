import { Suspense } from "react";
import { ParamsFallback, ParamsReport } from "@/modules/dynamic-segments";
import { readLocale } from "@/shared/i18n";

type Props = PageProps<"/[lang]/fundamentals/dynamic-segments/demo/docs/[[...slug]]">;

// Reading params (even only for the language) must sit inside the boundary.
async function Report({ params }: Pick<Props, "params">) {
  const [locale, resolvedParams] = await Promise.all([readLocale(params), params]);

  return <ParamsReport locale={locale} routePattern="/docs/[[...slug]]" params={resolvedParams} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<ParamsFallback />}>
      <Report params={params} />
    </Suspense>
  );
}
