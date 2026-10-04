import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SlotsFrame } from "./SlotsFrame";

afterEach(cleanup);

describe("SlotsFrame", () => {
  it("renders every slot it is given", () => {
    render(
      <SlotsFrame locale="en" team={<p>team slot</p>} analytics={<p>analytics slot</p>}>
        <p>children slot</p>
      </SlotsFrame>,
    );

    expect(screen.getByText("children slot")).toBeDefined();
    expect(screen.getByText("team slot")).toBeDefined();
    expect(screen.getByText("analytics slot")).toBeDefined();
  });

  it("offers both a soft navigation link and a full page load link", () => {
    render(
      <SlotsFrame locale="en" team={null} analytics={null}>
        {null}
      </SlotsFrame>,
    );

    expect(screen.getAllByRole("link", { name: /\/demo\/settings/ })).toHaveLength(2);
  });
});
