import { notFound } from "next/navigation";
import { PhotoPage, findPhoto, photos } from "@/modules/intercepting-routes";

export function generateStaticParams() {
  return photos.map((photo) => ({ id: photo.id }));
}

export default async function Page({
  params,
}: PageProps<"/fundamentals/intercepting-routes/demo/photo/[id]">) {
  const { id } = await params;
  const photo = findPhoto(id);

  if (!photo) {
    notFound();
  }

  return <PhotoPage photo={photo} />;
}
