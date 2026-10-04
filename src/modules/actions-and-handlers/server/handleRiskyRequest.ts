import "server-only";
import { randomUUID } from "node:crypto";
import { NextResponse, connection, type NextRequest } from "next/server";
import { reportUnexpectedError } from "@/shared/monitoring";
import { RiskModeSchema } from "../riskModes";
import { reserveItem } from "./reserveItem";

export async function handleRiskyRequest(request: NextRequest) {
  await connection();

  const mode = RiskModeSchema.safeParse(request.nextUrl.searchParams.get("mode"));
  if (!mode.success) {
    return NextResponse.json(
      { code: "invalid_mode", message: "mode must be ok, expected, unexpected, or uncaught." },
      { status: 400 },
    );
  }

  // "uncaught": nothing here catches the failure on purpose, so Next.js turns
  // it into a bare 500 and its central error hook reports it.
  if (mode.data === "uncaught") {
    await reserveItem(mode.data);
  }

  try {
    const result = await reserveItem(mode.data);

    if (!result.ok) {
      // Expected: the caller can act on it, so it is a 4xx with a stable code.
      return NextResponse.json({ code: result.reason, message: result.message }, { status: 409 });
    }
    return NextResponse.json({ reservation: result.reservation });
  } catch (error) {
    // Unexpected, and we are about to swallow it into a response, so this is
    // the one place that can report it. The caller gets a reference id and
    // nothing about the cause; the full error stays in the logs and monitor.
    const reference = randomUUID();
    console.error(`[${reference}] reserveItem failed`, error);
    reportUnexpectedError(error, {
      operation: "route-handler:risky",
      tags: { demo: "true", reference },
    });
    return NextResponse.json(
      { code: "internal_error", message: "Something went wrong on our side.", reference },
      { status: 500 },
    );
  }
}
