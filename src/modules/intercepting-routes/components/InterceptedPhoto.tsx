import type { Locale } from "@/shared/i18n";
import type { Photo } from "../photos";
import { PhotoModal } from "./PhotoModal";
import { PhotoView } from "./PhotoView";

type InterceptedPhotoProps = {
  photo: Photo;
  locale: Locale;
};

export function InterceptedPhoto({ photo, locale }: InterceptedPhotoProps) {
  const title = photo.titles[locale];

  return (
    <PhotoModal title={title}>
      <PhotoView color={photo.color} title={title} />
    </PhotoModal>
  );
}
