import { connection } from "next/server";
import { getRuntimeInfo } from "../server/runtimeInfo";
import { RuntimeRow } from "./RuntimeRow";

// Rendered per request so the answer comes from the live server process.
export async function ServerRenderRow() {
  await connection();
  const info = getRuntimeInfo();

  return (
    <RuntimeRow
      where="Server Component render"
      runtime={info.runtime}
      detail={`node ${info.nodeVersion}, EdgeRuntime global: ${info.hasEdgeGlobal}`}
    />
  );
}
