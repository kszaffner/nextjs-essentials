export type TestedUnit = {
  title: string;
  // Repo-relative path of the real test file. A test checks it still exists.
  testFile: string;
  technique: string;
};

// A map of the tests in this repository, grouped by what is hard about
// testing that kind of code in a Next.js app.
export const testedUnits: readonly TestedUnit[] = [
  {
    title: "Server Action with validation and redirect",
    testFile: "src/modules/validation-and-redirect/server/actions.test.ts",
    technique: "Call the action with a FormData. The real redirect() throws; assert on its digest.",
  },
  {
    title: "Server Action that refreshes the page",
    testFile: "src/modules/forms/server/actions.test.ts",
    technique: "Mock next/cache so refresh() is a spy; assert the action asked for it.",
  },
  {
    title: "Server Action with a built-in delay",
    testFile: "src/modules/form-hooks/server/actions.test.ts",
    technique: "Fake timers advance the wait; the test never sleeps.",
  },
  {
    title: "Server Action with expected and unexpected failures",
    testFile: "src/modules/actions-and-handlers/server/actions.test.ts",
    technique: "Assert that expected failures are returned and unexpected ones are thrown.",
  },
  {
    title: "Route Handler logic",
    testFile: "src/modules/route-handlers/server/notesApi.test.ts",
    technique: "Real NextRequest in, real Response out; only connection() is mocked.",
  },
  {
    title: 'A function marked "use cache"',
    testFile: "src/modules/revalidation/server/cachedEntries.test.ts",
    technique: "Mock cacheLife and cacheTag; the body runs as plain code and the calls are asserted.",
  },
  {
    title: "Code that calls fetch",
    testFile: "src/modules/fetch-extensions/server/clockClient.test.ts",
    technique: "Stub the global fetch; assert the URL, the options, and how bad responses are handled.",
  },
  {
    title: "Proxy decisions",
    testFile: "src/modules/proxy/decideProxyAction.test.ts",
    technique: "Keep the logic a pure function so it needs no request at all.",
  },
  {
    title: "A validation schema",
    testFile: "src/modules/validation-and-redirect/server/signupSchema.test.ts",
    technique: 'Stub "server-only" and test the schema like any other function.',
  },
  {
    title: "The error reporter",
    testFile: "src/shared/monitoring/reportUnexpectedError.test.ts",
    technique: "Mock the monitoring SDK, including making it throw, to prove reporting never does.",
  },
];
