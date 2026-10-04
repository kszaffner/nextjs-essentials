import { Suspense } from "react";
import { connection } from "next/server";
import { readMessages } from "../server/messageStore";
import { MessageBoard } from "./MessageBoard";

async function Board() {
  await connection();
  return <MessageBoard messages={readMessages()} />;
}

export function FormHooksDemo() {
  return (
    <Suspense fallback={<p>Loading the board…</p>}>
      <Board />
    </Suspense>
  );
}
