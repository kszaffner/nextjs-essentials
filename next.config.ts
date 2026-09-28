import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components: enables "use cache", cacheLife, cacheTag and Partial
  // Prerendering. Enabled from the start so every demo is written against
  // the current caching model; older behavior is shown only as contrast.
  cacheComponents: true,
  reactCompiler: true,
};

export default nextConfig;
