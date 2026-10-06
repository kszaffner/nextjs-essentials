export type TestedUnitId =
  | "actionRedirect"
  | "actionRefresh"
  | "actionDelay"
  | "actionFailures"
  | "routeHandler"
  | "useCache"
  | "fetchClient"
  | "proxyDecisions"
  | "schema"
  | "errorReporter";

export type TestedUnit = {
  id: TestedUnitId;
  // Repo-relative path of the real test file. A test checks it still exists.
  testFile: string;
};

// A map of the tests in this repository, grouped by what is hard about
// testing that kind of code in a Next.js app. What each one tests and with
// which technique is described per language in text.ts.
export const testedUnits: readonly TestedUnit[] = [
  { id: "actionRedirect", testFile: "src/modules/validation-and-redirect/server/actions.test.ts" },
  { id: "actionRefresh", testFile: "src/modules/forms/server/actions.test.ts" },
  { id: "actionDelay", testFile: "src/modules/form-hooks/server/actions.test.ts" },
  { id: "actionFailures", testFile: "src/modules/actions-and-handlers/server/actions.test.ts" },
  { id: "routeHandler", testFile: "src/modules/route-handlers/server/notesApi.test.ts" },
  { id: "useCache", testFile: "src/modules/revalidation/server/cachedEntries.test.ts" },
  { id: "fetchClient", testFile: "src/modules/fetch-extensions/server/clockClient.test.ts" },
  { id: "proxyDecisions", testFile: "src/modules/proxy/decideProxyAction.test.ts" },
  { id: "schema", testFile: "src/modules/validation-and-redirect/server/signupSchema.test.ts" },
  { id: "errorReporter", testFile: "src/shared/monitoring/reportUnexpectedError.test.ts" },
];
