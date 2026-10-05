import { NotFoundPanel } from "@/modules/not-found";

// Renders for any URL under a language that matches no route, inside the
// root layout (see [...unmatched]/page.tsx). A not-found file receives no
// params, so the panel reads the language from the layout's context.
export default function NotFound() {
  return <NotFoundPanel variant="root" />;
}
