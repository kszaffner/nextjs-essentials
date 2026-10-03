import type { Photo } from "../photos";
import { PhotoModal } from "./PhotoModal";
import { PhotoView } from "./PhotoView";

type InterceptedPhotoProps = {
  photo: Photo;
};

export function InterceptedPhoto({ photo }: InterceptedPhotoProps) {
  return (
    <PhotoModal title={photo.title}>
      <PhotoView photo={photo} />
    </PhotoModal>
  );
}
