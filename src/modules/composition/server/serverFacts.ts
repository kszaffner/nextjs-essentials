import "server-only";

// Importing this module from a Client Component is a build error: the
// server-only package exists to turn that mistake into a failure instead of
// a silent leak. The marker lets us check it never reaches a client bundle.
const SERVER_ONLY_MARKER = "SERVER_ONLY_MARKER_7f3a";

export function getServerFacts() {
  return {
    nodeVersion: process.version,
    renderedAt: new Date().toISOString(),
    marker: SERVER_ONLY_MARKER,
  };
}
