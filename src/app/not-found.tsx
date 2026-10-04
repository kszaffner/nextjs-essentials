import { NotFoundPanel } from "@/modules/not-found";

// Renders for any URL that matches no route, inside the root layout.
export default function NotFound() {
  return <NotFoundPanel title="Page not found" source="src/app/not-found.tsx (the root)" />;
}
