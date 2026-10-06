import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { Locale } from "@/shared/i18n";
import { locales } from "@/shared/i18n";
import type { TopicContent } from "@/shared/topic-page";
import { listTopicHrefs } from "./topics";

const modulesRoot = path.join(process.cwd(), "src/modules");

// Every module that has a content folder, found on disk rather than named, so
// a new topic is covered the moment it exists.
const contentModuleNames = readdirSync(modulesRoot).filter((name) =>
  existsSync(path.join(modulesRoot, name, "content")),
);

function hasInternalsPanel(directory: string): boolean {
  return ["page.tsx", "layout.tsx"].some((fileName) => {
    const file = path.join(directory, fileName);
    return existsSync(file) && readFileSync(file, "utf8").includes("<InternalsPanel");
  });
}

describe("every topic is complete", () => {
  it("has content in every language, and the languages differ", async () => {
    expect(contentModuleNames).toHaveLength(listTopicHrefs().length);
    for (const modulePath of contentModuleNames) {
      const { topicContent }: { topicContent: Record<Locale, TopicContent> } = await import(
        `../${modulePath}/content/index`
      );
      for (const locale of locales) {
        const content = topicContent[locale];
        expect(content.title.trim(), `${modulePath} ${locale} title`).not.toBe("");
        expect(content.summary.trim(), `${modulePath} ${locale} summary`).not.toBe("");
      }
      expect(topicContent.pl.summary, `${modulePath} summary is translated`).not.toBe(topicContent.en.summary);
    }
  });

  it("has a content folder with every language file in every module", () => {
    const incomplete = contentModuleNames.flatMap((name) =>
        locales
          .filter((locale) => !existsSync(path.join(modulesRoot, name, "content", `${locale}.tsx`)))
          .map((locale) => `${name}/${locale}`),
      );

    expect(incomplete).toEqual([]);
  });

  it("renders an Under the hood panel on every topic demo", () => {
    const withoutPanel = listTopicHrefs().filter(
      (href) => !hasInternalsPanel(path.join(process.cwd(), "src/app/[lang]", href, "demo")),
    );

    expect(withoutPanel).toEqual([]);
  });
});
