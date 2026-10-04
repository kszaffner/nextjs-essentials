import { NotFoundPanel } from "@/modules/not-found";

export default function NotFound() {
  return (
    <NotFoundPanel
      title="No such item"
      source="demo/[slug]/not-found.tsx (the segment's own)"
    />
  );
}
