import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getTopic, getTopicMetadata, topicGroups, type Topic } from "./topics";

const partialPrerenderingHref = "/rendering/ppr";
const allTopics = topicGroups.flatMap<Topic>((group) => [...group.topics]);

describe("topic catalog", () => {
  it("has a unique href for every topic", () => {
    const hrefs = allTopics.map((topic) => topic.href);

    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("has a route page for every topic", () => {
    const missingPages = allTopics.filter(
      (topic) => !existsSync(path.join(process.cwd(), "src/app", topic.href, "page.tsx")),
    );

    expect(missingPages).toEqual([]);
  });

  it("looks a topic up by href", () => {
    expect(getTopic(partialPrerenderingHref).title).toBe("Partial Prerendering");
  });

  it("derives page metadata from the topic", () => {
    expect(getTopicMetadata(partialPrerenderingHref)).toEqual({
      title: "Partial Prerendering",
      description: getTopic(partialPrerenderingHref).summary,
    });
  });
});
