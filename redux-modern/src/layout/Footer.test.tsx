import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Footer } from "./Footer";
import { store } from "../store";

describe("Footer", () => {
  it("links to the GitHub repo", () => {
    render(<Provider store={store}><Footer /></Provider>);

    expect(screen.getByRole("link", { name: /github/i }))
      .toHaveAttribute("href", "https://github.com/itenium-be/reduxjs-toolkit");
  });
});
