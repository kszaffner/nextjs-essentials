import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ParamsReport } from "./ParamsReport";

afterEach(cleanup);

describe("ParamsReport", () => {
  it("shows the route pattern and a string param", () => {
    render(<ParamsReport locale="en" routePattern="/blog/[slug]" params={{ slug: "hello" }} />);

    expect(screen.getByText("/blog/[slug]")).toBeDefined();
    expect(screen.getByText('params.slug = "hello"')).toBeDefined();
  });

  it("shows a catch-all param as an array", () => {
    render(<ParamsReport locale="en" routePattern="/shop/[...slug]" params={{ slug: ["a", "b"] }} />);

    expect(screen.getByText('params.slug = ["a","b"]')).toBeDefined();
  });

  it("says so when no param was captured", () => {
    render(<ParamsReport locale="en" routePattern="/docs/[[...slug]]" params={{}} />);

    expect(screen.getByText(/captured no dynamic segment/)).toBeDefined();
  });

  it("labels the site's own language param and does not count it as captured", () => {
    render(<ParamsReport locale="en" routePattern="/docs/[[...slug]]" params={{ lang: "pl" }} />);

    expect(screen.getByText(/params\.lang = "pl"/)).toBeDefined();
    expect(screen.getByText(/captured no dynamic segment/)).toBeDefined();
  });

  it("shows an explicitly undefined param", () => {
    render(<ParamsReport locale="en" routePattern="/docs/[[...slug]]" params={{ slug: undefined }} />);

    expect(screen.getByText("params.slug = undefined")).toBeDefined();
  });

  it("shows the note when given", () => {
    render(<ParamsReport locale="en" routePattern="/blog/featured" params={{}} note="Static wins." />);

    expect(screen.getByText("Static wins.")).toBeDefined();
  });
});
