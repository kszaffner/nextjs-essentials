import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { locales } from "@/shared/i18n";
import { getTopic, getTopicGroups, getTopicMetadata, listTopicHrefs } from "./topics";

const partialPrerenderingHref = "/rendering/ppr";
const allHrefs = listTopicHrefs();

describe("topic catalog", () => {
  it("has a unique href for every topic", () => {
    expect(new Set(allHrefs).size).toBe(allHrefs.length);
  });

  it("has a route page for every topic", () => {
    const missingPages = allHrefs.filter(
      (href) => !existsSync(path.join(process.cwd(), "src/app/[lang]", href, "page.tsx")),
    );

    expect(missingPages).toEqual([]);
  });

  it("looks a topic up by href", () => {
    expect(getTopic(partialPrerenderingHref, "en").title).toBe("Partial Prerendering");
  });

  it("has a title and summary in every language for every topic", () => {
    for (const locale of locales) {
      const incomplete = getTopicGroups(locale).flatMap((group) =>
        group.topics.filter((topic) => topic.title.trim() === "" || topic.summary.trim() === ""),
      );
      expect(incomplete).toEqual([]);
    }
  });

  it("translates the group titles", () => {
    expect(getTopicGroups("pl").map((group) => group.title)).not.toEqual(
      getTopicGroups("en").map((group) => group.title),
    );
  });

  it("derives page metadata from the topic", () => {
    expect(getTopicMetadata(partialPrerenderingHref, "pl")).toEqual({
      title: "Partial Prerendering",
      description: getTopic(partialPrerenderingHref, "pl").summary,
    });
  });
});
