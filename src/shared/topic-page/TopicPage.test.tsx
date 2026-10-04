import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { TopicPage } from "./TopicPage";

afterEach(cleanup);

function renderTopicPage(interviewQuestions: Parameters<typeof TopicPage>[0]["interviewQuestions"]) {
  render(
    <TopicPage
      locale="en"
      title="Sample topic"
      summary="A short summary."
      basics={<p>Basics content</p>}
      edgeCases={<p>Edge case content</p>}
      interviewQuestions={interviewQuestions}
    />,
  );
}

describe("TopicPage", () => {
  it("shows the title, summary, and the three fixed sections", () => {
    renderTopicPage([]);

    expect(screen.getByRole("heading", { level: 1, name: "Sample topic" })).toBeDefined();
    expect(screen.getByText("A short summary.")).toBeDefined();
    expect(screen.getByRole("region", { name: "Basics" })).toBeDefined();
    expect(screen.getByRole("region", { name: "Edge cases" })).toBeDefined();
    expect(screen.getByRole("region", { name: "Interview questions" })).toBeDefined();
    expect(screen.getByText("Basics content")).toBeDefined();
    expect(screen.getByText("Edge case content")).toBeDefined();
  });

  it("lists each interview question with its answer", () => {
    renderTopicPage([
      { question: "What is a layout?", answer: "Shared UI that persists." },
      { question: "What is a template?", answer: "Shared UI that remounts." },
    ]);

    expect(screen.getByText("What is a layout?")).toBeDefined();
    expect(screen.getByText("Shared UI that persists.")).toBeDefined();
    expect(screen.getByText("What is a template?")).toBeDefined();
  });

  it("says so when there are no interview questions yet", () => {
    renderTopicPage([]);

    expect(screen.getByText("No questions yet.")).toBeDefined();
  });
});

describe("TopicPage in Polish", () => {
  it("uses the translated section headings", () => {
    render(
      <TopicPage
        title="Temat"
        summary="Opis."
        basics={<p>Treść</p>}
        edgeCases={<p>Brzeg</p>}
        interviewQuestions={[]}
        locale="pl"
      />,
    );

    expect(screen.getByRole("region", { name: "Podstawy" })).toBeDefined();
    expect(screen.getByRole("region", { name: "Przypadki brzegowe" })).toBeDefined();
    expect(screen.getByRole("region", { name: "Pytania rekrutacyjne" })).toBeDefined();
    expect(screen.getByText("Brak pytań.")).toBeDefined();
  });
});
