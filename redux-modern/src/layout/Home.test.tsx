import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";

describe("Home", () => {
  it.each([
    ["✅ Todos, with Immer", "/todos"],
    ["🏰 Mythical Zoos", "/zoos"],
    ["🌿 Enchanted Wilds", "/wilds"],
  ])("links %s to %s", (title, path) => {
    render(<Home />, { wrapper: MemoryRouter });

    expect(screen.getByRole("link", { name: new RegExp(title.slice(2)) })).toHaveAttribute("href", path);
  });

  it("shows an image per block", () => {
    render(<Home />, { wrapper: MemoryRouter });

    expect(screen.getAllByRole("img")).toHaveLength(3);
  });
});
