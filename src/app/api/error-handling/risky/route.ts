import type { NextRequest } from "next/server";
import { handleRiskyRequest } from "@/modules/actions-and-handlers";

export function GET(request: NextRequest) {
  return handleRiskyRequest(request);
}
