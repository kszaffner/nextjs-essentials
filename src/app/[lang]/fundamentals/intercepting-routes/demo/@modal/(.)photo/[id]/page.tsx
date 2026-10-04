import { notFound } from "next/navigation";
import {
  InterceptedPhoto,
  findPhoto,
  photos,
} from "@/modules/intercepting-routes";

export function generateStaticParams() {
  return photos.map((photo) => ({ id: photo.id }));
}

export default async function Page({
  params,
}: PageProps<"/[lang]/fundamentals/intercepting-routes/demo/photo/[id]">) {
  const { id } = await params;
  const photo = findPhoto(id);

  if (!photo) {
    notFound();
  }

  return <InterceptedPhoto photo={photo} />;
}
