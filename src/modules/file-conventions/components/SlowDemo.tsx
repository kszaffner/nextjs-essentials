import { connection } from "next/server";
import { DemoPanel } from "./DemoPanel";

const SIMULATED_DELAY_MS = 1500;

// connection() opts this render out of prerendering, so the delay happens on
// every request and the closest loading.tsx is what the user sees meanwhile.
export async function SlowDemo() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  return (
    <DemoPanel title="Slow page">
      <p>
        This content took {SIMULATED_DELAY_MS} ms to render on the server.
      </p>
    </DemoPanel>
  );
}
