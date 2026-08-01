import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthScreen from "../AuthScreen";

describe("AuthScreen Component", () => {
  it("renders login form by default", () => {
    const mockOnLoginSuccess = vi.fn();

    render(<AuthScreen onLoginSuccess={mockOnLoginSuccess} />);

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. user@mizan\.com/i)).toBeInTheDocument();
  });
});
