import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("links to the GitHub repo", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: /github/i }))
      .toHaveAttribute("href", "https://github.com/itenium-be/reduxjs-toolkit");
  });
});
