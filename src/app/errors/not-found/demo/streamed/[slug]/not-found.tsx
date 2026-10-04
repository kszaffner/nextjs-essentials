import { NotFoundPanel } from "@/modules/not-found";

export default function NotFound() {
  return (
    <NotFoundPanel
      title="No such item (streamed)"
      source="demo/streamed/[slug]/not-found.tsx"
    />
  );
}
