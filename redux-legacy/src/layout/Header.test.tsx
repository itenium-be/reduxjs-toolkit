import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

describe("Header", () => {
  it("links back to the examples index outside this app", () => {
    render(<Header />, { wrapper: MemoryRouter });

    const link = screen.getByRole("link", { name: /all redux examples/i });
    expect(link).toHaveAttribute("href", `${import.meta.env.BASE_URL}../`);
  });
});
