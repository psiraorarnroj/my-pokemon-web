import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "@/app/components/Card";

describe("Card Component", () => {
  it("renders the card with a name", () => {
    render(<Card name="Pikachu" />);
    const nameElement = screen.getByText(/Pikachu/i);
    expect(nameElement).toBeInTheDocument();
  });

  it("renders the card with an image if image prop is provided", () => {
    render(<Card name="Pikachu" image="/pikachu.png" />);
    const imageElement = screen.getByAltText(/Pikachu/i);
    expect(imageElement).toBeInTheDocument();
  });

  it("does not render the image container if image prop is not provided", () => {
    render(<Card name="Pikachu" />);
    const imageElement = screen.queryByAltText(/Pikachu/i);
    expect(imageElement).toBeNull();
  });

  it("applies the passed className", () => {
    render(<Card name="Pikachu" className="test-class" />);
    const cardElement = screen.getByText(/Pikachu/i).closest("div");
    expect(cardElement).toHaveClass("test-class");
  });
});
