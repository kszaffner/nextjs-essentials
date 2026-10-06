import { defineConfig } from "@playwright/test";

const port = 3100;

// Runs against a production build (`pnpm build` first): the rendering and
// caching behavior the topics describe only exists there.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    command: `pnpm start -p ${port}`,
    url: `http://localhost:${port}/pl`,
    reuseExistingServer: true,
  },
});
