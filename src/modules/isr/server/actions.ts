"use server";

import { revalidateTag } from "next/cache";
import { CATALOG_TAG } from "./catalogSnapshot";

// Public on purpose: it only marks one demo cache entry stale and takes no
// input. A real action that invalidates user-visible data would check
// authorization here, inside the action, not in the UI that renders the button.
export async function revalidateCatalog() {
  // "max": serve stale content while the regeneration runs.
  revalidateTag(CATALOG_TAG, "max");
}
