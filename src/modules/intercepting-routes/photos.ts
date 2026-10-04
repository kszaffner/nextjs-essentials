import type { Locale } from "@/shared/i18n";

export type Photo = {
  id: string;
  titles: Record<Locale, string>;
  color: string;
};

export const photos: readonly Photo[] = [
  { id: "1", titles: { en: "Sunrise", pl: "Wschód słońca" }, color: "#f4a261" },
  { id: "2", titles: { en: "Forest", pl: "Las" }, color: "#2a9d8f" },
  { id: "3", titles: { en: "Ocean", pl: "Ocean" }, color: "#457b9d" },
  { id: "4", titles: { en: "Dusk", pl: "Zmierzch" }, color: "#6d597a" },
];

export function findPhoto(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}
