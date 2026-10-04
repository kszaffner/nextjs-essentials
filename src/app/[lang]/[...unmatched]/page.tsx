import { notFound } from "next/navigation";

// With the root layout inside [lang], Next.js has no root not-found.tsx for a
// URL that matches nothing under /pl or /en. This catch-all turns such a URL
// into notFound(), so the localized not-found.tsx answers with a 404.
export default function UnmatchedPage() {
  notFound();
}
