export type Photo = {
  id: string;
  title: string;
  color: string;
};

export const photos: readonly Photo[] = [
  { id: "1", title: "Sunrise", color: "#f4a261" },
  { id: "2", title: "Forest", color: "#2a9d8f" },
  { id: "3", title: "Ocean", color: "#457b9d" },
  { id: "4", title: "Dusk", color: "#6d597a" },
];

export function findPhoto(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}
