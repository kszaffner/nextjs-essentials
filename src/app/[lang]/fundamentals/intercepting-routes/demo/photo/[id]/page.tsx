import { notFound } from "next/navigation";
import { readLocale } from "@/shared/i18n";
import { PhotoPage, findPhoto, photos } from "@/modules/intercepting-routes";

export function generateStaticParams() {
  return photos.map((photo) => ({ id: photo.id }));
}

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/intercepting-routes/demo/photo/[id]">) {
  const { id } = await params;
  const locale = await readLocale(params);
  const photo = findPhoto(id);

  if (!photo) {
    notFound();
  }

  return <PhotoPage photo={photo} locale={locale} />;
}
