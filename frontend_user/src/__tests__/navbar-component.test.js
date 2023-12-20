import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Navbar from "../component/navbar-component";
import "@testing-library/jest-dom";

describe("Navbar component", () => {
  it("renders user information correctly", async () => {
    render(
      <MemoryRouter initialEntries={[`/1`]}>
        <Routes>
          <Route path="/*" element={<Navbar />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the "home" link is highlighted
    const homeLink = screen.getByRole('link', { name: 'home' });
    expect(homeLink).toHaveStyle({ color: "#35A996" });

    // Check if the "shop" link is not highlighted
    const shopLink = screen.getByRole('link', { name: 'shop' });
    expect(shopLink).toHaveStyle({ color: "rgb(53, 169, 150)" });
  });
});
