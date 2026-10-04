import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { findPhoto, photos } from "../photos";
import { Gallery } from "./Gallery";

afterEach(cleanup);

describe("Gallery", () => {
  it("links every photo to its own photo URL", () => {
    render(<Gallery locale="en" />);

    for (const photo of photos) {
      const link = screen.getByRole("link", { name: photo.titles.en });
      expect(link.getAttribute("href")).toBe(
        `/pl/fundamentals/intercepting-routes/demo/photo/${photo.id}`,
      );
    }
  });
});

describe("findPhoto", () => {
  it("finds a photo by id", () => {
    expect(findPhoto("2")?.titles.en).toBe("Forest");
  });

  it("returns undefined for an unknown id", () => {
    expect(findPhoto("unknown")).toBeUndefined();
  });

  it("shows the Polish titles in Polish", () => {
    render(<Gallery locale="pl" />);

    expect(screen.getByRole("link", { name: "Wschód słońca" })).toBeDefined();
  });
});
