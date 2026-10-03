"use server";

import { revalidateTag } from "next/cache";
import { FETCH_DEMO_TAG } from "./clockClient";

// Public on purpose (see the ISR demo action): it only marks the demo's
// tagged fetch entries stale and takes no input.
export async function revalidateFetchDemo() {
  revalidateTag(FETCH_DEMO_TAG, "max");
}
