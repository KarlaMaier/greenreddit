import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SportsPosts from "../SportsPosts";

describe("<SportsPosts />", () => {
  test("renders without crashing", () => {
    render(<SportsPosts searchQuery="" />);
  });

  test("displays loading text initially", () => {
    render(<SportsPosts searchQuery="" />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  // Additional tests for posts and error states
});
