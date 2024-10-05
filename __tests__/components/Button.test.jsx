import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/app/components/Button";

describe("Button Component", () => {
  it("should render the button with the correct label", () => {
    render(<Button label="Click Me" onClick={jest.fn()} />);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call the onClick handler when the button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);

    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call the onClick handler when the button is disabled", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} disabled={true} />);

    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should have the disabled attribute when disabled is true", () => {
    render(<Button label="Click Me" onClick={jest.fn()} disabled={true} />);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeDisabled();
  });
});
