import "server-only";
import { NextResponse } from "next/server";

// One stable error shape for every failure: a machine-readable code, a
// human-readable message, and optional details. Never a stack trace or an
// internal message.
export type ApiErrorBody = {
  code: string;
  message: string;
  details?: unknown;
};

export function errorResponse(status: number, body: ApiErrorBody): NextResponse {
  return NextResponse.json(body, { status });
}
