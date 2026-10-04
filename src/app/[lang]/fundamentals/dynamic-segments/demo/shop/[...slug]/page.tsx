import { Suspense } from "react";
import { ParamsFallback, ParamsReport } from "@/modules/dynamic-segments";
import { readLocale } from "@/shared/i18n";

type Props = PageProps<"/[lang]/fundamentals/dynamic-segments/demo/shop/[...slug]">;

// No generateStaticParams, so the params are runtime data under Cache
// Components: reading them, even only for the language, must sit inside a
// Suspense boundary.
async function Report({ params }: Pick<Props, "params">) {
  const [locale, resolvedParams] = await Promise.all([readLocale(params), params]);

  return <ParamsReport locale={locale} routePattern="/shop/[...slug]" params={resolvedParams} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<ParamsFallback />}>
      <Report params={params} />
    </Suspense>
  );
}
