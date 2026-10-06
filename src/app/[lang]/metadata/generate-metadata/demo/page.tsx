import { getGenerateMetadataText } from "@/modules/generate-metadata";
import { readLocale } from "@/shared/i18n";

export default async function Page({ params }: PageProps<"/[lang]/metadata/generate-metadata/demo">) {
  const locale = await readLocale(params);

  return <p>{getGenerateMetadataText(locale).home}</p>;
}
