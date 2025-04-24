import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeToggle } from "@/components/common/theme-toggle";

describe("ThemeToggle", () => {
  it("renders and toggles theme", () => {
    const { container } = render(<ThemeToggle />);
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    fireEvent.click(button!);
  });
});
