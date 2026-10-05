import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getRuntimeInfo } from "../server/runtimeInfo";
import { getRuntimesText } from "../text";
import { RuntimeRow } from "./RuntimeRow";

// Rendered per request so the answer comes from the live server process.
export async function ServerRenderRow({ locale }: { locale: Locale }) {
  await connection();
  const info = getRuntimeInfo();
  const text = getRuntimesText(locale);

  return (
    <RuntimeRow
      where={text.serverRender.where}
      runtime={info.runtime}
      detail={text.detail(info.nodeVersion, info.hasEdgeGlobal)}
    />
  );
}
